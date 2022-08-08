import * as React from "react";
import { SideNav, SideNavList, SideNavListItem } from "./SideNavPrimitives";
import { styled } from "../../stitches.config";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
const TitleContainer = styled("div", {
    display: "flex",
    columnGap: "$3",
    alignItems: "center",
});

const StyledTitle = styled("h2", {
    margin: 0,
    padding: 0,
});

export function SideNavBar() {
    const router = useRouter();
    const determineActive = useCallback(
        (url: string) => {
            if (router.asPath.includes("overview")) {
                return "overview";
            } else if (router.asPath.includes("getting-started")) {
                return "getting-started";
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
    }, [determineActive, router.asPath]);

    const Title = () => {
        return (
            <TitleContainer>
                <StyledTitle>Alloy Docs</StyledTitle>
            </TitleContainer>
        );
    };

    return (
        <SideNav title={<Title />}>


            <SideNavList title="Alloy SDK">
                <SideNavListItem
                    to="/overview"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        router.push("/overview");
                    }}
                    active={active.includes("overview") ? true : false}
                >
                    {" "}
                    Overview
                </SideNavListItem>{" "}
                <SideNavListItem
                    to="/getting-started"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        router.push("/getting-started");
                    }}
                    active={active.includes("getting-started") ? true : false}
                >
                    {" "}
                    Getting Started
                </SideNavListItem>{" "}
                <SideNavListItem
                    to="/demo"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        router.push("/demo");
                    }}
                    active={active.includes("demo") ? true : false}
                >
                    {" "}
                    Demo
                </SideNavListItem>{" "}
            </SideNavList>
        </SideNav>
    );
}