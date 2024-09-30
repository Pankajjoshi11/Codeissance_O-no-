import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";

import { benefitOne, benefitTwo } from "@/components/data";
export default function Home() {
  return (
    <Container>
      <Hero />
      <SectionTitle>

      </SectionTitle>

      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      <SectionTitle>

      </SectionTitle>

      <Video videoId="fZ0D0cnR88E" />

      <SectionTitle
        preTitle="LATEST NWES"
        title="Current News for Today"
      >
        Reading news is important because it keeps you informed, helps you make better decisions, broadens your perspective, and fosters critical thinking about global events and issues.


      </SectionTitle>

      <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
        Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests.
      </SectionTitle>

      <Faq />
      <Cta />
    </Container>
  );
}
