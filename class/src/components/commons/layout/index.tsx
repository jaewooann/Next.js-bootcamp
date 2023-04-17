import { useRouter } from "next/router";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";

const HIDDEN_HEADERS = [
  "/12-02-library-star",
  "/12-07-modal-custom-address-refactoring"
  // ...
  // ...
]

interface ILayoutProps {
  children: JSX.Element;
}
export default function Layout(props: ILayoutProps) {
  const router = useRouter();

  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);

  return (
    <>
      {!isHiddenHeader && <LayoutHeader />}
      <LayoutBanner />
      <LayoutNavigation />
      <div style={{display: 'flex', height: '500px'}}>
        <div style={{width: '30%', background: 'orange'}}>사이드바</div>
        <div style={{width: '70%'}}>{props.children}</div>
      </div>
      <LayoutFooter />
    </>
  );
}