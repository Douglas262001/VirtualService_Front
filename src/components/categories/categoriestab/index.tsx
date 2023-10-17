import CategoryTabRoot from "./tabs/CategoryTabRoot";
import CategoryGeneralTab from "./tabs/General";
import CategoryImageTab from "./tabs/Image";
import CategoryItemsTab from "./tabs/Items";

type CategoryTabType = {
  Root: typeof CategoryTabRoot;
  General: typeof CategoryGeneralTab;
  Items: typeof CategoryItemsTab;
  Image: typeof CategoryImageTab;
};

export const CategoryTab: CategoryTabType = {
  Root: CategoryTabRoot,
  General: CategoryGeneralTab,
  Items: CategoryItemsTab,
  Image: CategoryImageTab,
};
