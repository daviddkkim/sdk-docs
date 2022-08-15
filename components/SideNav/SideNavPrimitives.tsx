import * as React from "react";
import { forwardRef } from "react";
import { styled } from "../../stitches.config";

/* -------------------------------------------------------------------------------------------------
 * SideNav (Root)
 * -----------------------------------------------------------------------------------------------*/
export interface SideNavProps {
  children: React.ReactNode;
  title: React.ReactNode;
  style?: React.CSSProperties;
}

const StyledNav = styled("nav", {
  width: "264px",
  display: "flex",
  flexDirection: "column",
  rowGap: "$3",
  backgroundColor: "$background-secondary-neutral",
  padding: "$6 $2",
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  boxSizing: "border-box",
});

const StyledTitle = styled("div", {
  marginBottom: "$2",
  padding: "0 $4",
});

export const SideNav = forwardRef<HTMLDivElement, SideNavProps>(
  ({ children, style, title }, ref) => {
    return (
      <StyledNav
        role="menu"
        aria-orientation="vertical"
        aria-label="Sidebar"
        style={style}
        ref={ref}
      >
        <StyledTitle>{title}</StyledTitle>
        {children}
      </StyledNav>
    );
  }
);

SideNav.displayName = "SideNav";

/* -------------------------------------------------------------------------------------------------
 * SideNavList (if its a List with a header)
 * -----------------------------------------------------------------------------------------------*/
export interface SidenavListProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  title?: string;
}
const StyledNavList = styled("ul", {
  all: "unset",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: "$2",
  padding: 0,
  boxSizing: "border-box",
  margin: 0,
  variants: {
    subMenu: {
      true: {
        marginLeft: '$5',
      }
    }
  }
});

const StyledListHeader = styled("h4", {
  margin: 0,
  padding: "$2 $4",
  fontWeight: 400,
  color: "$text-primary",
});
export const SideNavList = forwardRef<HTMLUListElement, SidenavListProps>(
  ({ children, style, title }, ref) => {
    const listHeader = title ? (
      <StyledListHeader> {title} </StyledListHeader>
    ) : null;
    return (
      <StyledNavList style={style} ref={ref}>
        {listHeader && listHeader}
        {children}
      </StyledNavList>
    );
  }
);

SideNavList.displayName = "SideNavList";
/* -------------------------------------------------------------------------------------------------
 * SideNavListItem
 * -----------------------------------------------------------------------------------------------*/
export interface SidenavListItemProps {
  children: React.ReactNode;
  to: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: any;
  active?: boolean;
  tabIndex?: number;
  indented?: boolean;
  subItems?: {
    label: React.ReactNode;
    to: string;
    active?: boolean;
  }[]
}
const StyledNavlistitem = styled("li", {
  all: "unset",
  width: "100%",
  boxSizing: "border-box",
});

const NavLink = styled("a", {
  all: "unset",
  display: "flex",
  width: "100%",
  padding: "$2 $3",
  backgroundColor: "inherit",
  border: "1px solid transparent",
  boxSizing: "border-box",
  alignItems: "center",
  color: "$mauve11",
  transition: "all 150ms ease",
  borderRadius: "$2",
  fontWeight: "500",
  fontSize: "$4",
  "&:hover": {
    backgroundColor: "$background-secondary-hover",
    boxShadow: "1px 1px 1px $colors$shadow-default",
    svg: {
      color: "$mauve12",
    },
  },
  "&:focus-visible": {
    boxShadow:
      "0 0 0 2px $colors$border-focus-base, 0 0 0 3px $colors$border-focus-additive",
  },
  variants: {
    state: {
      active: {
        color: "$text-primary",
      },
      default: {},
    },
    subMenu: {
      true: {
        padding: '$1 $4',
        fontWeight: "400",
        fontSize: '$3',
        width: "calc(100% - $6)",

      }
    }
  },
});

const ContentContainer = styled("div", {
  display: "flex",
  columnGap: "$2",
  alignItems: "center",
  width: "100%",
});

const StyledText = styled("span", {
  lineHeight: "$4",
  width: "100%",
  boxSizing: "border-box",
});

export const SideNavListItem = forwardRef<HTMLLIElement, SidenavListItemProps>(
  (
    {
      children,
      style,
      onClick,
      to,
      tabIndex,
      active = false,
      icon,
      indented = false,
      subItems
    },
    ref
  ) => {
    return (
      <>
        <StyledNavlistitem style={style} ref={ref}>
          <NavLink
            onClick={onClick}
            href={to}
            tabIndex={tabIndex}
            state={active ? "active" : "default"}
          >
            <ContentContainer>
              {icon ? (
                <div>{icon}</div>
              ) : indented ? (
                <div style={{ width: "20px" }}></div>
              ) : null}
              <StyledText>{children}</StyledText>
            </ContentContainer>
          </NavLink>
        </StyledNavlistitem>
        {active && subItems &&
          subItems.map((subItem, index) => {
            return (
              <StyledNavList subMenu={true} key={index}>
                <StyledNavlistitem style={style} ref={ref}>
                  <NavLink
                    href={subItem.to}
                    tabIndex={tabIndex}
                    state={subItem.active ? "active" : "default"}
                    subMenu={true}
                  >
                    <ContentContainer>
                      <StyledText>{subItem.label}</StyledText>
                    </ContentContainer>
                  </NavLink>
                </StyledNavlistitem>
              </StyledNavList>
            )
          })}
      </>
    );
  }
);

SideNavListItem.displayName = "SideNavListItem";
