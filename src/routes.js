import React from 'react';

// home pages
const HomeWrapper = React.lazy(() => import("./pages/home/HomeWrapper"));
const HomePersonalized = React.lazy(() => import("./pages/home/HomePersonalized"));
const HomeFashion = React.lazy(() => import("./pages/home/HomeFashion"));
const HomeFashionTwo = React.lazy(() => import("./pages/home/HomeFashionTwo"));
const HomeFashionThree = React.lazy(() => import("./pages/home/HomeFashionThree"));
const HomeFashionFour = React.lazy(() => import("./pages/home/HomeFashionFour"));
const HomeFashionFive = React.lazy(() => import("./pages/home/HomeFashionFive"));
const HomeFashionSix = React.lazy(() => import("./pages/home/HomeFashionSix"));
const HomeFashionSeven = React.lazy(() => import("./pages/home/HomeFashionSeven"));
const HomeFashionEight = React.lazy(() => import("./pages/home/HomeFashionEight"));
const HomeKidsFashion = React.lazy(() => import("./pages/home/HomeKidsFashion"));
const HomeCosmetics = React.lazy(() => import("./pages/home/HomeCosmetics"));
const HomeFurniture = React.lazy(() => import("./pages/home/HomeFurniture"));
const HomeFurnitureTwo = React.lazy(() => import("./pages/home/HomeFurnitureTwo"));
const HomeFurnitureThree = React.lazy(() => import("./pages/home/HomeFurnitureThree"));
const HomeFurnitureFour = React.lazy(() => import("./pages/home/HomeFurnitureFour"));
const HomeFurnitureFive = React.lazy(() => import("./pages/home/HomeFurnitureFive"));
const HomeFurnitureSix = React.lazy(() => import("./pages/home/HomeFurnitureSix"));
const HomeFurnitureSeven = React.lazy(() => import("./pages/home/HomeFurnitureSeven"));
const HomeElectronics = React.lazy(() => import("./pages/home/HomeElectronics"));
const HomeElectronicsTwo = React.lazy(() => import("./pages/home/HomeElectronicsTwo"));
const HomeElectronicsThree = React.lazy(() => import("./pages/home/HomeElectronicsThree"));
const HomeBookStore = React.lazy(() => import("./pages/home/HomeBookStore"));
const HomeBookStoreTwo = React.lazy(() => import("./pages/home/HomeBookStoreTwo"));
const HomePlants = React.lazy(() => import("./pages/home/HomePlants"));
const HomeFlowerShop = React.lazy(() => import("./pages/home/HomeFlowerShop"));
const HomeFlowerShopTwo = React.lazy(() => import("./pages/home/HomeFlowerShopTwo"));
const HomeOrganicFood = React.lazy(() => import("./pages/home/HomeOrganicFood"));
const HomeOrganicFoodTwo = React.lazy(() => import("./pages/home/HomeOrganicFoodTwo"));
const HomeOnepageScroll = React.lazy(() => import("./pages/home/HomeOnepageScroll"));
const HomeGridBanner = React.lazy(() => import("./pages/home/HomeGridBanner"));
const HomeAutoParts = React.lazy(() => import("./pages/home/HomeAutoParts"));
const HomeCakeShop = React.lazy(() => import("./pages/home/HomeCakeShop"));
const HomeHandmade = React.lazy(() => import("./pages/home/HomeHandmade"));
const HomePetFood = React.lazy(() => import("./pages/home/HomePetFood"));
const HomeMedicalEquipment = React.lazy(() => import("./pages/home/HomeMedicalEquipment"));
const HomeChristmas = React.lazy(() => import("./pages/home/HomeChristmas"));
const HomeBlackFriday = React.lazy(() => import("./pages/home/HomeBlackFriday"));
const HomeBlackFridayTwo = React.lazy(() => import("./pages/home/HomeBlackFridayTwo"));
const HomeValentinesDay = React.lazy(() => import("./pages/home/HomeValentinesDay"));

// shop pages
const ShopGridPersonalized = React.lazy(() => import("./pages/shop/ShopGridPersonalized"));
const ShopGridStandard = React.lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = React.lazy(() => import("./pages/shop/ShopGridFilter"));
const ShopGridTwoColumn = React.lazy(() => import("./pages/shop/ShopGridTwoColumn"));
const ShopGridNoSidebar = React.lazy(() => import("./pages/shop/ShopGridNoSidebar"));
const ShopGridFullWidth = React.lazy(() => import("./pages/shop/ShopGridFullWidth"));
const ShopGridRightSidebar = React.lazy(() => import("./pages/shop/ShopGridRightSidebar"));
const ShopListStandard = React.lazy(() => import("./pages/shop/ShopListStandard"));
const ShopListFullWidth = React.lazy(() => import("./pages/shop/ShopListFullWidth"));
const ShopListTwoColumn = React.lazy(() => import("./pages/shop/ShopListTwoColumn"));

// product pages
const Product = React.lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = React.lazy(() => import("./pages/shop-product/ProductTabLeft"));
const ProductTabRight = React.lazy(() => import("./pages/shop-product/ProductTabRight"));
const ProductSticky = React.lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = React.lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = React.lazy(() => import("./pages/shop-product/ProductFixedImage"));

// blog pages
const Articles = React.lazy(() => import("./pages/blog/BlogNoSidebar"));
const Article = React.lazy(() => import("./pages/blog/BlogDetailsStandard"));

// const BlogStandard = React.lazy(() => import("./pages/blog/BlogStandard"));
// const BlogNoSidebar = React.lazy(() => import("./pages/blog/BlogNoSidebar"));
// const BlogRightSidebar = React.lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = React.lazy(() => import("./pages/blog/BlogDetailsStandard"));

// other pages
const About = React.lazy(() => import("./pages/other/About"));
const Contact = React.lazy(() => import("./pages/other/Contact"));
const MyAccount = React.lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = React.lazy(() => import("./pages/other/LoginRegister"));

const Cart = React.lazy(() => import("./pages/other/Cart"));
const Wishlist = React.lazy(() => import("./pages/other/Wishlist"));
const Compare = React.lazy(() => import("./pages/other/Compare"));
const Checkout = React.lazy(() => import("./pages/other/Checkout"));

const NotFound = React.lazy(() => import("./pages/other/NotFound"));

const routes = [
                // { path: process.env.PUBLIC_URL + "/", exact: true, name: 'Home', component: HomePersonalized },
                { path: process.env.PUBLIC_URL + "/", exact: true, name: 'Home', component: HomeWrapper },
                { path: process.env.PUBLIC_URL + "/shop", exact: true, name: 'Shop', component: ShopGridPersonalized },

                // {/* Homepages */}
                { path: process.env.PUBLIC_URL + "/home-fashion", name: 'HomeFashion', component: HomeFashion },
                { path: process.env.PUBLIC_URL + "/home-fashion-two", name: 'HomeFashionTwo', component: HomeFashionTwo },
                { path: process.env.PUBLIC_URL + "/home-fashion-three", name: 'HomeFashionThree', component: HomeFashionThree },
                { path: process.env.PUBLIC_URL + "/home-fashion-four", name: 'HomeFashionFour', component: HomeFashionFour },
                { path: process.env.PUBLIC_URL + "/home-fashion-five", name: 'HomeFashionFive', component: HomeFashionFive },
                { path: process.env.PUBLIC_URL + "/home-fashion-six", name: 'HomeFashionSix', component: HomeFashionSix },
                { path: process.env.PUBLIC_URL + "/home-fashion-seven", name: 'HomeFashionSeven', component: HomeFashionSeven },
                { path: process.env.PUBLIC_URL + "/home-fashion-eight", name: 'HomeFashionEight', component: HomeFashionEight },
                { path: process.env.PUBLIC_URL + "/home-kids-fashion", name: 'HomeKidsFashion', component: HomeKidsFashion },
                { path: process.env.PUBLIC_URL + "/home-cosmetics", name: 'HomeCosmetics', component: HomeCosmetics },
                { path: process.env.PUBLIC_URL + "/home-furniture", name: 'HomeFurniture', component: HomeFurniture },
                { path: process.env.PUBLIC_URL + "/home-furniture-two", name: 'HomeFurnitureTwo', component: HomeFurnitureTwo },
                { path: process.env.PUBLIC_URL + "/home-furniture-three", name: 'HomeFurnitureThree', component: HomeFurnitureThree },
                { path: process.env.PUBLIC_URL + "/home-furniture-four", name: 'HomeFurnitureFour', component: HomeFurnitureFour },
                { path: process.env.PUBLIC_URL + "/home-furniture-five", name: 'HomeFurnitureFive', component: HomeFurnitureFive },
                { path: process.env.PUBLIC_URL + "/home-furniture-six", name: 'HomeFurnitureSix', component: HomeFurnitureSix },
                { path: process.env.PUBLIC_URL + "/home-furniture-seven", name: 'HomeFurnitureSeven', component: HomeFurnitureSeven },
                { path: process.env.PUBLIC_URL + "/home-electronics", name: 'HomeElectronics', component: HomeElectronics },
                { path: process.env.PUBLIC_URL + "/home-electronics-two", name: 'HomeElectronicsTwo', component: HomeElectronicsTwo },
                { path: process.env.PUBLIC_URL + "/home-electronics-three", name: 'HomeElectronicsThree', component: HomeElectronicsThree },
                { path: process.env.PUBLIC_URL + "/home-book-store", name: 'HomeBookStore', component: HomeBookStore },
                { path: process.env.PUBLIC_URL + "/home-book-store-two", name: 'HomeBookStoreTwo', component: HomeBookStoreTwo },
                { path: process.env.PUBLIC_URL + "/home-plants", name: 'HomePlants', component: HomePlants },
                { path: process.env.PUBLIC_URL + "/home-flower-shop", name: 'HomeFlowerShop', component: HomeFlowerShop },
                { path: process.env.PUBLIC_URL + "/home-flower-shop-two", name: 'HomeFlowerShopTwo', component: HomeFlowerShopTwo },
                { path: process.env.PUBLIC_URL + "/home-organic-food", name: 'HomeOrganicFood', component: HomeOrganicFood },
                { path: process.env.PUBLIC_URL + "/home-organic-food-two", name: 'HomeOrganicFoodTwo', component: HomeOrganicFoodTwo },
                { path: process.env.PUBLIC_URL + "/home-onepage-scroll", name: 'HomeOnepageScroll', component: HomeOnepageScroll },
                { path: process.env.PUBLIC_URL + "/home-grid-banner", name: 'HomeGridBanner', component: HomeGridBanner },
                { path: process.env.PUBLIC_URL + "/home-auto-parts", name: 'HomeAutoParts', component: HomeAutoParts },
                { path: process.env.PUBLIC_URL + "/home-cake-shop", name: 'HomeCakeShop', component: HomeCakeShop },
                { path: process.env.PUBLIC_URL + "/home-handmade", name: 'HomeHandmade', component: HomeHandmade },
                { path: process.env.PUBLIC_URL + "/home-pet-food", name: 'HomePetFood', component: HomePetFood },
                { path: process.env.PUBLIC_URL + "/home-medical-equipment", name: 'HomeMedicalEquipment', component: HomeMedicalEquipment },
                { path: process.env.PUBLIC_URL + "/home-christmas", name: 'HomeChristmas', component: HomeChristmas },
                { path: process.env.PUBLIC_URL + "/home-black-friday", name: 'HomeBlackFriday', component: HomeBlackFriday },
                { path: process.env.PUBLIC_URL + "/home-black-friday-two", name: 'HomeBlackFridayTwo', component: HomeBlackFridayTwo },
                { path: process.env.PUBLIC_URL + "/home-valentines-day", name: 'HomeValentinesDay', component: HomeValentinesDay },

                // {/* Shop pages */}
                { path: process.env.PUBLIC_URL + "/shop-grid-standard", name: 'ShopGridStandard', component: ShopGridStandard },
                { path: process.env.PUBLIC_URL + "/shop-grid-filter", name: 'ShopGridFilter', component: ShopGridFilter },
                { path: process.env.PUBLIC_URL + "/shop-grid-two-column", name: 'ShopGridTwoColumn', component: ShopGridTwoColumn },
                { path: process.env.PUBLIC_URL + "/shop-grid-no-sidebar", name: 'ShopGridNoSidebar', component: ShopGridNoSidebar },
                { path: process.env.PUBLIC_URL + "/shop-grid-full-width", name: 'ShopGridFullWidth', component: ShopGridFullWidth },
                { path: process.env.PUBLIC_URL + "/shop-grid-right-sidebar", name: 'ShopGridRightSidebar', component: ShopGridRightSidebar },
                { path: process.env.PUBLIC_URL + "/shop-list-standard", name: 'ShopListStandard', component: ShopListStandard },
                { path: process.env.PUBLIC_URL + "/shop-list-full-width", name: 'ShopListFullWidth', component: ShopListFullWidth },
                { path: process.env.PUBLIC_URL + "/shop-list-two-column", name: 'ShopListTwoColumn', component: ShopListTwoColumn },

                // {/* Shop product pages */}
                { path: process.env.PUBLIC_URL + "/product/:id", name: 'Product', component: Product },
                { path: process.env.PUBLIC_URL + "/product-tab-left/:id", name: 'ProductTabLeft', component: ProductTabLeft },
                { path: process.env.PUBLIC_URL + "/product-tab-right/:id", name: 'ProductTabRight', component: ProductTabRight },
                { path: process.env.PUBLIC_URL + "/product-sticky/:id", name: 'ProductSticky', component: ProductSticky },
                { path: process.env.PUBLIC_URL + "/product-slider/:id", name: 'ProductSlider', component: ProductSlider },
                { path: process.env.PUBLIC_URL + "/product-fixed-image/:id", name: 'ProductFixedImage', component: ProductFixedImage },

                // {/* Blog pages */}
                { path: process.env.PUBLIC_URL + "/articles/:id", name: 'Article', component: Article },
                { path: process.env.PUBLIC_URL + "/articles", name: 'Articles', component: Articles },
                // { path: process.env.PUBLIC_URL + "/blog-standard", name: 'BlogStandard', component: BlogStandard },
                // { path: process.env.PUBLIC_URL + "/blog-no-sidebar", name: 'BlogNoSidebar', component: BlogNoSidebar },
                // { path: process.env.PUBLIC_URL + "/blog-right-sidebar", name: 'BlogRightSidebar', component: BlogRightSidebar },
                { path: process.env.PUBLIC_URL + "/blog-details-standard", name: 'BlogDetailsStandard', component: BlogDetailsStandard },

                // {/* Other pages */}
                { path: process.env.PUBLIC_URL + "/about", name: 'About', component: About },
                { path: process.env.PUBLIC_URL + "/contact", name: 'Contact', component: Contact },
                { path: process.env.PUBLIC_URL + "/my-account", name: 'MyAccount', component: MyAccount },
                { path: process.env.PUBLIC_URL + "/login-register", name: 'LoginRegister', component: LoginRegister },
                { path: process.env.PUBLIC_URL + "/cart", name: 'Cart', component: Cart },
                { path: process.env.PUBLIC_URL + "/wishlist", name: 'Wishlist', component: Wishlist },
                { path: process.env.PUBLIC_URL + "/compare", name: 'Compare', component: Compare },
                { path: process.env.PUBLIC_URL + "/checkout", name: 'Checkout', component: Checkout },
                { path: process.env.PUBLIC_URL + "/not-found", name: 'NotFound', component: NotFound },
];

export default routes;

// <Route
//   path={process.env.PUBLIC_URL + "/product/:id"}
//   render={(routeProps) => <Product {...routeProps} key={routeProps.match.params.id} /> }
// />