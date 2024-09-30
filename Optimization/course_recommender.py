import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from surprise import accuracy
import random
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
import os

class EnhancedCourseRecommendationSystem:
    def __init__(self, courses_file='Optimization/expanded_courses_dataset.csv', 
                 responses_file='Optimization/expanded_user_responses_dataset.csv'):
        self.courses_file = courses_file
        self.responses_file = responses_file
        self.courses_df = pd.read_csv(self.courses_file)
        self.responses_df = pd.read_csv(self.responses_file)
        self.svd_model = None
        self.tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        self.tfidf_matrix = None

    def fetch_live_responses(self, num_responses=10):
        users = self.responses_df['user_id'].unique().tolist()
        courses = self.courses_df['course_id'].tolist()
        questions = range(1, 6)  # Assume we have questions 1-5

        new_responses = []
        for _ in range(num_responses):
            user_id = random.choice(users)
            course_id = random.choice(courses)
            question_id = random.choice(questions)
            is_correct = random.choice([0, 1])
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            new_responses.append([user_id, course_id, question_id, is_correct, timestamp])

        new_responses_df = pd.DataFrame(new_responses, columns=['user_id', 'course_id', 'question_id', 'is_correct', 'timestamp'])
        self.responses_df = pd.concat([self.responses_df, new_responses_df], ignore_index=True)
        self.responses_df.to_csv(self.responses_file, index=False)

    def prepare_data_for_collaborative_filtering(self):
        user_course_data = self.responses_df.groupby(['user_id', 'course_id'])['is_correct'].agg(
            lambda x: 1 - x.mean()  # Ratio of incorrect answers
        ).reset_index()

        reader = Reader(rating_scale=(0, 1))
        return Dataset.load_from_df(user_course_data[['user_id', 'course_id', 'is_correct']], reader)

    def train_collaborative_filtering_model(self):
        dataset = self.prepare_data_for_collaborative_filtering()
        trainset, testset = train_test_split(dataset, test_size=0.2)
        self.svd_model = SVD()
        self.svd_model.fit(trainset)

        predictions = self.svd_model.test(testset)
        rmse = accuracy.rmse(predictions)
        print(f"Model RMSE: {rmse}")

    def prepare_content_based_filtering(self):
        course_texts = self.courses_df['course_description'] + ' ' + self.courses_df['topics']
        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(course_texts)

    def get_content_based_recommendations(self, course_id, num_recommendations=5):
        course_idx = self.courses_df.index[self.courses_df['course_id'] == course_id].tolist()[0]
        cosine_similarities = cosine_similarity(self.tfidf_matrix[course_idx], self.tfidf_matrix).flatten()
        related_course_indices = cosine_similarities.argsort()[-num_recommendations-1:-1][::-1]
        return self.courses_df.iloc[related_course_indices]['course_id'].tolist()

    def get_collaborative_filtering_recommendations(self, user_id, num_recommendations=5):
        all_courses = self.courses_df['course_id'].unique()
        course_predictions = []

        for course in all_courses:
            prediction = self.svd_model.predict(user_id, course)
            course_predictions.append((course, prediction.est))

        course_predictions.sort(key=lambda x: x[1], reverse=True)
        return [course for course, _ in course_predictions[:num_recommendations]]

    def get_recommendations(self, user_id, num_recommendations=5):
        if self.svd_model is None:
            self.train_collaborative_filtering_model()
        if self.tfidf_matrix is None:
            self.prepare_content_based_filtering()

        cf_recommendations = self.get_collaborative_filtering_recommendations(user_id, num_recommendations)
        content_recommendations = []
        for course in cf_recommendations:
            content_recommendations.extend(self.get_content_based_recommendations(course, 2))
        
        combined_recommendations = list(dict.fromkeys(cf_recommendations + content_recommendations))
        return combined_recommendations[:num_recommendations]

    def analyze_user_performance(self, user_id):
        user_data = self.responses_df[self.responses_df['user_id'] == user_id]
        course_performance = user_data.groupby('course_id').agg({
            'is_correct': ['mean', 'count']
        }).reset_index()
        course_performance.columns = ['course_id', 'accuracy', 'questions_attempted']
        return course_performance

    def visualize_user_performance(self, user_id):
        performance = self.analyze_user_performance(user_id)
        
        plt.figure(figsize=(12, 6))
        
        # Bar plot for accuracy
        plt.subplot(1, 2, 1)
        sns.barplot(x='course_id', y='accuracy', data=performance)
        plt.title(f'User {user_id} Performance - Accuracy')
        plt.ylim(0, 1)
        plt.ylabel('Accuracy')
        plt.xlabel('Course ID')

        # Bar plot for questions attempted
        plt.subplot(1, 2, 2)
        sns.barplot(x='course_id', y='questions_attempted', data=performance)
        plt.title(f'User {user_id} Performance - Questions Attempted')
        plt.ylabel('Questions Attempted')
        plt.xlabel('Course ID')

        plt.tight_layout()
        plt.show()

    def visualize_recommendations(self, user_id, recommendations):
        recommended_courses = self.courses_df[self.courses_df['course_id'].isin(recommendations)]
        
        plt.figure(figsize=(12, 6))
        
        # Bar plot for course difficulty
        plt.subplot(1, 2, 1)
        difficulty_order = ['Beginner', 'Intermediate', 'Advanced']
        sns.countplot(x='difficulty', data=recommended_courses, order=difficulty_order)
        plt.title(f'Recommended Courses for User {user_id} - Difficulty')
        plt.ylabel('Count')
        plt.xlabel('Difficulty Level')

        # Pie chart for course topics
        plt.subplot(1, 2, 2)
        topics = recommended_courses['topics'].str.split(', ', expand=True).stack().value_counts()
        plt.pie(topics.values, labels=topics.index, autopct='%1.1f%%')
        plt.title(f'Recommended Courses for User {user_id} - Topics')

        plt.tight_layout()
        plt.show()

    def visualize_user_progress(self, user_id):
        user_data = self.responses_df[self.responses_df['user_id'] == user_id]
        user_data['timestamp'] = pd.to_datetime(user_data['timestamp'])
        
        daily_performance = user_data.groupby(user_data['timestamp'].dt.date)['is_correct'].mean().reset_index()
        daily_performance.columns = ['date', 'accuracy']

        plt.figure(figsize=(12, 6))
        sns.lineplot(x='date', y='accuracy', data=daily_performance)
        plt.title(f'User {user_id} Progress Over Time')
        plt.ylabel('Accuracy')
        plt.xlabel('Date')
        plt.ylim(0, 1)
        plt.tight_layout()
        plt.show()

# Create and populate the datasets
expanded_courses_data = {
    "course_id": ["C001", "C002", "C003", "C004", "C005", "C006", "C007", "C008", "C009", "C010"],
    "course_name": [
        "Introduction to Financial Literacy",
        "Investment Strategies 101",
        "Personal Budgeting Basics",
        "Understanding Credit Scores",
        "Retirement Planning Essentials",
        "Advanced Investment Techniques",
        "Debt Management Strategies",
        "Tax Planning for Individuals",
        "Financial Goal Setting",
        "Investment Psychology"
    ],
    "course_description": [
        "A foundational course on financial literacy concepts.",
        "Learn various investment strategies and their applications.",
        "Master the basics of creating and managing a personal budget.",
        "Explore how credit scores work and their impact on finances.",
        "Essential strategies for planning for retirement effectively.",
        "Deep dive into advanced investment techniques and analysis.",
        "Understand how to manage and reduce debt effectively.",
        "Learn strategies for tax planning to optimize personal finances.",
        "Set and achieve your financial goals with effective strategies.",
        "Explore the psychological aspects of investing and decision-making."
    ],
    "topics": [
        "Financial Concepts, Budgeting, Saving",
        "Investing, Risk Management, Portfolio Diversification",
        "Budgeting, Savings Goals, Expense Tracking",
        "Credit Scores, Loans, Financial Health",
        "Retirement Accounts, Savings, Financial Planning",
        "Investment Analysis, Risk Assessment, Market Trends",
        "Debt Reduction, Credit Management, Financial Planning",
        "Tax Strategies, Deductions, Financial Planning",
        "Goal Setting, Financial Planning, Motivation",
        "Behavioral Finance, Market Psychology, Investor Behavior"
    ],
    "difficulty": ["Beginner", "Intermediate", "Beginner", "Intermediate", "Advanced",
                  "Advanced", "Intermediate", "Advanced", "Beginner", "Intermediate"],
    "prerequisites": ["", "C001", "C002", "", "C003", "C002", "C001", "C003", "", "C005"]
}

expanded_user_responses_data = {
    "user_id": ["U001", "U002", "U003", "U001", "U002", "U003", "U001", "U002", "U003", "U001"],
    "course_id": ["C001", "C001", "C002", "C003", "C003", "C002", "C004", "C005", "C006", "C007"],
    "question_id": [1, 2, 1, 1, 2, 2, 1, 1, 1, 1],
    "is_correct": [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    "timestamp": [
        "2024-09-30 10:00:00",
        "2024-09-30 10:05:00",
        "2024-09-30 10:10:00",
        "2024-09-30 10:15:00",
        "2024-09-30 10:20:00",
        "2024-09-30 10:25:00",
        "2024-09-30 10:30:00",
        "2024-09-30 10:35:00",
        "2024-09-30 10:40:00",
        "2024-09-30 10:45:00"
    ]
}

# Create DataFrames
expanded_courses_df = pd.DataFrame(expanded_courses_data)
expanded_user_responses_df = pd.DataFrame(expanded_user_responses_data)

# Define file paths
courses_file_path = 'Optimization/expanded_courses_dataset.csv'
responses_file_path = 'Optimization/expanded_user_responses_dataset.csv'

# Create directories if they don't exist
os.makedirs('Optimization', exist_ok=True)

# Save the datasets to CSV files
expanded_courses_df.to_csv(courses_file_path, index=False)
expanded_user_responses_df.to_csv(responses_file_path, index=False)

print("Datasets exported successfully to the Optimization folder.")

# Example usage
recommender = EnhancedCourseRecommendationSystem()

# Simulate fetching live responses
recommender.fetch_live_responses(50)

# Train the model
recommender.train_collaborative_filtering_model()

# Get recommendations for a user
user_id = "U001"
recommendations = recommender.get_recommendations(user_id)
print(f"Recommended courses for User {user_id}: {recommendations}")

# Visualize user performance
recommender.visualize_user_performance(user_id)

# Visualize recommendations
recommender.visualize_recommendations(user_id, recommendations)

# Visualize user progress
recommender.visualize_user_progress(user_id)

# Analyze user performance (text output)
performance = recommender.analyze_user_performance(user_id)
print(f"Performance analysis for User {user_id}:")
print(performance)