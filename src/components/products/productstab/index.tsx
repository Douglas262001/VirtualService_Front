import General from "./tabs/General";
import ImageTab from "./tabs/Image";
import ProductsTabRoot from "./tabs/ProductsTabRoot";
import Steps from "./tabs/Steps";

type ProductsTabType = {
  Root: typeof ProductsTabRoot;
  General: typeof General;
  Steps: typeof Steps;
  Image: typeof ImageTab;
};

export const ProductsTab: ProductsTabType = {
  Root: ProductsTabRoot,
  General: General,
  Steps: Steps,
  Image: ImageTab,
};
