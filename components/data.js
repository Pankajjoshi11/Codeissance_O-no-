import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../public/img/benefit-one.png";
import benefitTwoImg from "../public/img/benefit-two.png";

const benefitOne = {
  title: "Highlight your benefits",
  desc: " Create engaging modules on financial topics like budgeting, saving, investing, and retirement planning.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Interactive Learning Modules:",
      desc: "Incorporate fun and interactive features to enhance user engagement for learners of all ages.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Gamification Elements:",
      desc: " Incorporate fun and interactive features to enhance user engagement for learners of all ages.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Personalized Recommendations",
      desc: "Offer tailored feedback and suggestions based on user interactions and progress, along with real-world examples and case studies to illustrate financial concepts.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "",
  desc: "",
  image: benefitTwoImg,
  bullets: [
    {
      title: "",
      desc: "",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "",
      desc: "",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "",
      desc: " ",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
