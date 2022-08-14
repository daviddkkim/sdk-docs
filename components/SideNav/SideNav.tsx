import * as React from "react";
import { SideNav, SideNavList, SideNavListItem } from "./SideNavPrimitives";
import { styled } from "../../stitches.config";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  HomeIcon,
  CodeIcon,
  RocketIcon,
  ExternalLinkIcon,
  PlayIcon,
  IdCardIcon,
  Share1Icon
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
const TitleContainer = styled("div", {
  display: "flex",
  columnGap: "$3",
  alignItems: "center",
});
const Box = styled("div");

const getIcon = (
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
) => {
  const SizedIcon = styled(icon, {
    size: "$4",
  });
  return <SizedIcon />;
};

export function SideNavBar() {
  const router = useRouter();
/*   const determineActive = useCallback(
    (url: string) => {
      if (router.asPath.includes("overview")) {
        return "overview";
      } else if (router.asPath.includes("quickstart")) {
        return "quickstart";
      } else if (router.asPath.includes("demo")) {
        return "demo";
      }
      return "";
    },
    [router.asPath]
  );

  //just initialize with actual value rather than empty
  const [active, setActive] = useState(determineActive(router.asPath));
  useEffect(() => {
    setActive(determineActive(router.asPath));
  }, [determineActive, router.asPath]); */

  const Title = () => {
    return (
      <TitleContainer>
        <Image src={"/Logo.svg"} height={27} width={115}></Image>
      </TitleContainer>
    );
  };

  return (
    <SideNav title={<Title />}>
      <SideNavList>
        <SideNavListItem
          to="/overview"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            router.push("/overview");
          }}
          active={router.asPath.includes("overview") ? true : false}
          icon={getIcon(HomeIcon)}
        >
          {" "}
          Overview
        </SideNavListItem>{" "}
        <SideNavListItem
          to="/quickstart/introduction"
          active={router.asPath.includes("quickstart") ? true : false}
          icon={getIcon(RocketIcon)}
          subItems={
            [
                {
                    label: 'Intro to Journeys',
                    to:'/quickstart/introduction',
                    active: router.asPath.includes('/quickstart/introduction')
                },
                {
                    label: 'First API call',
                    to:'/quickstart/first-api',
                    active: router.asPath.includes('/quickstart/first-api')
                },
                {
                    label: 'Using Alloy SDK',
                    to:'/quickstart/alloy-sdk',
                    active: router.asPath.includes('/quickstart/alloy-sdk')
                },
                {
                    label: 'Next steps',
                    to:'/quickstart/next-steps',
                    active: router.asPath.includes('/quickstart/next-steps')
                }
            ]
          }
        >
          {" "}
          Quickstart
        </SideNavListItem>{" "}
        <SideNavListItem
          to="/journeys"
          active={router.asPath.includes("journeys") ? true : false}
          icon={getIcon(Share1Icon)}
        >
          {" "}
          Journeys
        </SideNavListItem>
        <SideNavListItem
          to="/sdk"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            router.push("/sdk");
          }}
          active={router.asPath.includes("sdk") ? true : false}
          icon={getIcon(IdCardIcon)}
        >
          SDK
        </SideNavListItem>
        <SideNavListItem
          to="/api"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            router.push("/demo");
          }}
          active={router.asPath.includes("demo") ? true : false}
          icon={getIcon(CodeIcon)}
          style={{
            width: "100%",
          }}
        >
          {" "}
          <Box
            css={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>API</span>
            {getIcon(ExternalLinkIcon)}
          </Box>
        </SideNavListItem>
      </SideNavList>
    </SideNav>
  );
}
