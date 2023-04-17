// import { useRouter } from "next/router";
import { useRouter } from "next/router";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";

const HIDDEN_LAYOUT = [
  '/login',
  '/register'
];

interface ILayoutProps {
  children: JSX.Element
}

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  console.log(router.asPath);

  const isHiddenLayout = HIDDEN_LAYOUT.includes(router.asPath);

  return (
    <>
      {isHiddenLayout ?
        <>
          <LayoutHeader />
          <div>{props.children}</div>
          <LayoutFooter />
        </>
        :
        <>
          <LayoutHeader />
          <LayoutBanner />
          <LayoutNavigation />
          <div>{props.children}</div>
          <LayoutFooter />
        </>
      }
    </>
  );
}