import MainLayout from "../components/layout/MainLayout";
import { Button } from "../components/Button/Button";
import { Box } from "../components/Box";
import Image from "next/image";
import Card from "../components/Card";
import { ButtonColor, ButtonSize } from "../components/Button/types";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import StyledLink from "../components/Link";
import Link from "next/link";
import { styled } from "../stitches.config";

const ImageBox = styled("div", {
  variants: {
    display: {
      phone: { display: "none" },
      tablet: { display: "none" },
      desktop: { display: "block" },
      monitor: { display: "block" },
    },
  },
});
const ImagedBox = () => {
  return (
    <ImageBox
      css={{
        width: "100%",
      }}
      display={{
        "@phone": "phone",
        "@tablet": "tablet",
        "@desktop": "desktop",
        "@monitor": "monitor",
      }}
    >
      <Image
        src={"/Journeys.png"}
        width={1590}
        height={986}
        style={{ borderRadius: "8px" }}
      />
    </ImageBox>
  );
};

const Overview = () => {
  const router = useRouter();

  return (
    <Box
      css={{
        flexDirection: "column",
        gap: "$9",
      }}
    >
      <Box
        css={{
          flexDirection: "column",
        }}
      >
        <h1>Documentation </h1>
        <p>
          Alloy is the Identity Decisioning Platform that helps banks and
          fintech companies automate their decisions for onboarding, transaction
          monitoring and credit underwriting. Our single-API platform connects
          you and other clients like Gemini, Marqeta and Ally Bank to multiple
          data sources that result in the ability to make better fraud, risk and
          compliance decisions. Here, you’ll find comprehensive guides and
          documentation to help you integrate with Alloy quickly and seamlessly.{" "}
        </p>
      </Box>
      <Box
        css={{
          gap: "$6",
          flexDirection: "row",
        }}
      >
        <Box
          css={{
            flexDirection: "column",
          }}
        >
          <Box
            css={{
              flexDirection: "column",
            }}
          >
            <h2 style={{ margin: 0 }}>Journeys </h2>
            <p>
              Journeys are the core of your Fraud, Credit and Compliance
              decisioning at Alloy. Learn the core concepts and integrate
              Journeys to your application.{" "}
            </p>
          </Box>
          <Box
            css={{
              gap: "$3",
            }}
          >
            <Button size={ButtonSize.large} onClick={()=>{
                router.push('/quickstart/journeys')
            }}> Get Started </Button>
          </Box>
        </Box>
        <ImagedBox />
      </Box>
      <Box css={{ flexDirection: "column", gap: "$6" }}>
        <h2 style={{ margin: 0 }}>Developer tooling</h2>
        <Box
          css={{
            gap: "$4",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          <Card
            title={"API References"}
            body={"Sample Description"}
            footer={
              <Link href={"https://developer.alloy.com/public/docs"} passHref>
                <StyledLink target="_blank">View References</StyledLink>
              </Link>
            }
            style={{ maxWidth: "344px" }}
          />
          <Card
            title={"Alloy SDK"}
            body={"Sample Description"}
            footer={
              <Link href={"/sdk"} passHref>
                <StyledLink> Try it</StyledLink>
              </Link>
            }
            style={{ maxWidth: "344px" }}
          />
          <Card
            title={"Alloy Webhooks"}
            body={"Sample Description"}
            footer={"Learn more"}
            style={{ maxWidth: "344px" }}
          />
        </Box>
      </Box>
      <Box css={{ flexDirection: "column", gap: "$6" }}>
        <h2 style={{ margin: 0 }}>Popular Usecases</h2>
        <Box
          css={{
            gap: "$4",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          <Card
            title={"Transaction Monitoring"}
            body={"Sample Description"}
            footer={"Learn more"}
            style={{ maxWidth: "344px" }}
          />
          <Card
            title={"Credit underwriting"}
            body={"Sample Description"}
            footer={"Learn more"}
            style={{ maxWidth: "344px" }}
          />
          <Card
            title={"Onboarding something"}
            body={"Sample Description"}
            footer={"Learn more"}
            style={{ maxWidth: "344px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

Overview.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Overview;
