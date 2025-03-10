import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { useAppContext } from '../App';

export default function ProductSwipe() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, addToFavorites } = useAppContext();

  useEffect(() => {
    const allProducts = [
      {
        id: "1",
        name: "Blue Checks Regular Fit Shirt",
        price: 1199,
        description: "Update your everyday shirt collection with this cool and comfy regular fit full sleeve shirt from snitch. The regular fit lends you an easygoing look and with our breathable shirts in 40% polyester, 60% cotton, comfort is no longer reserved for the weekends.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3955-01_1_dcd91f0d-b0e7-4056-90cf-ef60c2629af0.jpg?v=1739862125",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Blue","Beige","Brown"]
      },
      {
        id: "2",
        name: "White Solid Slim Fit Button Down Shirt",
        price: 899,
        description: "Crisp and clean, this slim-fit white shirt from Snitch is crafted from 100% cotton for ultimate comfort. Featuring a classic button-down collar and a single chest pocket, it’s perfect for both casual and formal settings. Elevate your wardrobe with this versatile piece that offers style and affordability.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_c9d19608-f668-424a-83fa-df577bcc70c0.jpg?v=1739429664",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["White","Olive","Pink","Navy","Beige","Black","Maroon","Khaki","Green","Grey","Blue"]
      },
      {
        id: "3",
        name: "Charcoal Grey Slim Fit Shirt",
        price: 999,
        description: "Give a majestic lift to your look with this charcoal grey plain pattern shirt. The shirt is crafted from fine 61% cotton, 39% polyester. It is a versatile staple and great for teaming with jeans for a more casual look or smartening up with a classic pair of chinos.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3917-02_1_f26033cd-122c-4887-b412-b495b5d14594.jpg?v=1739287147",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Charcoal Grey","Olive","Purple","Green","White","Blue"]
      },
      {
        id: "4",
        name: "Black Solid Slim Fit Button Down Shirt",
        price: 899,
        description: "Jet black button-down shirt in 100% cotton, offering a sleek slim fit and half sleeves. Perfect for both casual and semi-formal occasions, this shirt combines comfort with style, making it a versatile addition to any wardrobe. Ideal for those who appreciate quality and affordability.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3916-03_1_e5ee30ad-caf0-45bc-bc0b-6f48f4ef74d1.jpg?v=1739423396",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Black","Olive","Pink","Navy","Beige","Maroon","Khaki","Green","White","Grey","Blue"]
      },
      {
        id: "5",
        name: "Dark Blue Checks Regular Fit Shirt",
        price: 1199,
        description: "Give a majestic lift to your look with this dark blue checks pattern shirt. The shirt is crafted from fine 40% polyester, 60% cotton. It is a versatile staple and great for teaming with jeans for a more casual look or smartening up with a classic pair of chinos.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3955-06_1_632841d3-a37e-47c0-a89a-74b5bccdf1e6.jpg?v=1739862181",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Dark Blue","Beige","Brown"]
      },
      {
        id: "6",
        name: "Dark Green Textured Slim Fit Shirt",
        price: 1199,
        description: "Give your everyday wardrobe an effortless appeal with this classy dark green 99% polyester, 1% elastane shirt. Designed in a slim fit, this shirt is known for its endless versatility. A look that bridges dressy and casual, with full sleeve and spread, it is perfect to wear alone or as an outer layer.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3900-03_1_f0d84fdd-6831-4a07-9a6e-a93b673e0722.jpg?v=1739287112",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Dark Green","Black","Cream","Brown"]
      },
      {
        id: "7",
        name: "Light Blue Slim Fit Shirt",
        price: 899,
        description: "Give your everyday wardrobe an effortless appeal with this classy light blue 100% cotton shirt. Designed in a slim fit, this shirt is known for its endless versatility. A look that bridges dressy and casual, with half sleeve and button down, it is perfect to wear alone or as an outer layer.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3916-05_1_ae33f357-6a4f-46b4-8961-9ff15f7509e0.jpg?v=1739862046",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Light Blue","Olive","Pink","Navy","Beige","Black","Maroon","Khaki","Green","White","Grey"]
      },
      {
        id: "8",
        name: "Black Box Fit Shirt",
        price: 899,
        description: "Maintain a timeless look as you transition between smart and casual in timeless style with snitch's new season collection of men's shirts. No matter what your style is, you need this half sleeve box fit shirt in your wardrobe. It is made from 100% cotton and features a roomy cut for a casual style.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3819-01_1_da500787-330b-46bf-a612-bcf50a5df99f.jpg?v=1741094239",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Black","Olive","Mauve","White","Grey"]
      },
      {
        id: "9",
        name: "White Box Fit Shirt",
        price: 899,
        description: "Give a majestic lift to your look with this white plain pattern shirt. The shirt is crafted from fine 100% cotton. It is a versatile staple and great for teaming with jeans for a more casual look or smartening up with a classic pair of chinos.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3819-02_1_b49d3d6e-ec9f-4cd4-8bad-341ccb80e946.jpg?v=1741094253",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["White","Olive","Mauve","Black","Grey"]
      },
      {
        id: "10",
        name: "Black Textured Slim Fit Shirt",
        price: 1199,
        description: "Update your everyday shirt collection with this cool and comfy slim fit full sleeve shirt from snitch. The slim fit lends you an easygoing look and with our breathable shirts in 99% polyester, 1% elastane, comfort is no longer reserved for the weekends.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3900-04_5_adb49f69-82ae-4206-82a8-61633385150c.jpg?v=1739345429",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Black","Cream","Brown","Green"]
      },
      {
        id: "11",
        name: "Black Textured Slim Fit Shirt",
        price: 999,
        description: "Elevate your wardrobe with this slim-fit shirt featuring a unique textured design. Crafted from a premium blend of 96% Polyester and 4% Spandex, it offers a sleek look and comfortable stretch. Perfect for versatile styling, this shirt combines modern aesthetics with everyday practicality.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3898-04_1_ab6bf9e2-af96-470b-84d3-27e67faabc10.jpg?v=1740577306",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Black","Olive","Brown","Beige"]
      },
      {
        id: "12",
        name: "Light Beige Textured Slim Fit Shirt",
        price: 999,
        description: "Textured beige shirt with a slim fit, featuring a unique wavy pattern and full sleeves. Made from a polyester blend for comfort and durability, this shirt is perfect for both casual and formal occasions. Elevate your wardrobe with this stylish and versatile piece from Snitch.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3898-01_1_83b100df-1a32-4aee-8936-d5d0be29827c.jpg?v=1739973913",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Beige","Black","Olive","Brown"]
      },
      {
        id: "13",
        name: "Green Solid Slim Fit Button Down Shirt",
        price: 899,
        description: "Deep Forest Green hue elevates this slim-fit shirt, featuring a classic button-down collar and half sleeves. Crafted from 100% cotton, it offers breathable comfort and a sleek look, perfect for both casual outings and semi-formal events. Experience premium quality at an affordable price with Snitch.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3916-02_1_8e39b28d-0fa5-4c1c-9b15-e12e5709cc3e.jpg?v=1739423154",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Green","Olive","Pink","Navy","Beige","Black","Maroon","Khaki","White","Grey","Blue"]
      },
      {
        id: "14",
        name: "Maroon Solid Slim Fit Shirt",
        price: 899,
        description: "Rich Burgundy hue and slim fit make this 100% cotton shirt a standout piece. Featuring a button-down collar and a single chest pocket, it combines classic style with modern comfort. Perfect for both casual and semi-formal occasions, this shirt offers a versatile addition to your wardrobe at an affordable price.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3916-10_4_452f48f4-28ae-40bf-9229-12b1bc0931c2.jpg?v=1739423317",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Maroon","Olive","Pink","Navy","Beige","Black","Khaki","Green","White","Grey","Blue"]
      },
      {
        id: "15",
        name: "Olive Slim Fit Shirt",
        price: 899,
        description: "Give a majestic lift to your look with this olive plain pattern shirt. The shirt is crafted from fine 100% cotton. It is a versatile staple and great for teaming with jeans for a more casual look or smartening up with a classic pair of chinos.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3916-04_1_5c636b8f-6066-41b4-b412-6fae7f32881f.jpg?v=1739862028",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Olive","Pink","Navy","Beige","Black","Maroon","Khaki","Green","White","Grey","Blue"]
      },
      {
        id: "16",
        name: "Khaki Solid Slim Fit Button Down Shirt",
        price: 899,
        description: "Crafted from 100% cotton, this slim-fit shirt from Snitch features a classic button-down collar and a single chest pocket. Its light Khaki hue and short sleeves make it perfect for both casual and semi-formal occasions. Enjoy the comfort and style of this versatile piece, ideal for any wardrobe.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3916-08_1_64cc1dff-f321-4412-b474-2406929a7703.jpg?v=1739423368",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Khaki","Olive","Pink","Navy","Beige","Black","Maroon","Green","White","Grey","Blue"]
      },
      {
        id: "17",
        name: "Dark Green Textured Box Fit Shirt",
        price: 999,
        description: "Give a majestic lift to your look with this dark green textured pattern shirt. The shirt is crafted from fine 96% polyester 4% spandex. It is a versatile staple and great for teaming with jeans for a more casual look or smartening up with a classic pair of chinos.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3698-02_1_84de79e0-11fe-4287-acde-92688878af6c.jpg?v=1739286796",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Dark Green","Black","Maroon","Cream"]
      },
      {
        id: "18",
        name: "Charcoal Grey Slim Fit Shirt",
        price: 899,
        description: "Give a majestic lift to your look with this charcoal grey plain pattern shirt. The shirt is crafted from fine 100% cotton. It is a versatile staple and great for teaming with jeans for a more casual look or smartening up with a classic pair of chinos.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3916-09_1_4e650b64-2877-4867-b741-260079a0ec5a.jpg?v=1739862064",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Charcoal Grey","Olive","Pink","Navy","Beige","Black","Maroon","Khaki","Green","White","Blue"]
      },
      {
        id: "19",
        name: "Pink Solid Slim Fit Shirt",
        price: 899,
        description: "Soft Dusty Rose hue elevates this slim-fit shirt, featuring a button-down collar and a single chest pocket. Crafted from 100% cotton, it offers breathable comfort and a refined look, perfect for both casual outings and smart-casual settings. Experience quality and style at an affordable price with Snitch.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3916-12_1_f7b9c333-9a62-4c76-832f-2c37a45aa84a.jpg?v=1739386587",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Pink","Olive","Navy","Beige","Black","Maroon","Khaki","Green","White","Grey","Blue"]
      },
      {
        id: "20",
        name: "Beige Solid Slim Fit Shirt",
        price: 899,
        description: "Soft beige cotton shirt with a slim fit, featuring a button-down collar and a single chest pocket. Perfect for casual outings or relaxed office days, this shirt combines comfort with a clean, modern look.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3916-11_1_496826dd-ab33-4b46-846a-0dcd85e01195.jpg?v=1739386570",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Beige","Olive","Pink","Navy","Black","Maroon","Khaki","Green","White","Grey","Blue"]
      },
      {
        id: "21",
        name: "Cream Textured Slim Fit Shirt",
        price: 1199,
        description: "Update your everyday shirt collection with this cool and comfy slim fit full sleeve shirt from snitch. The slim fit lends you an easygoing look and with our breathable shirts in 99% polyester, 1% elastane, comfort is no longer reserved for the weekends.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3900-01_1_2ba2cae1-9852-4996-b2d4-81eeca2ab262.jpg?v=1739287080",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Cream","Black","Brown","Green"]
      },
      {
        id: "22",
        name: "Brown Textured Slim Fit Shirt",
        price: 999,
        description: "Richly textured with a unique wave pattern, this slim-fit shirt in 96% Polyester and 4% Spandex offers a modern twist to your wardrobe. The soft, stretchable fabric ensures all-day comfort, while the earthy brown tone adds a sophisticated edge. Perfect for casual outings or semi-formal events.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3898-03_1_8a72bb03-1e11-409d-9be7-9ebcfb79a9a9.jpg?v=1740577289",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Brown","Black","Olive","Beige"]
      },
      {
        id: "23",
        name: "Olive Textured Slim Fit Shirt",
        price: 999,
        description: "Elevate your shirt in a unique textured design, crafted from a 96% Polyester, 4% Spandex blend. This slim-fit shirt offers a stylish look with its rich olive green color and full sleeves, perfect for both casual and formal occasions. Experience comfort and elegance at an affordable price.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3898-02_1_4cb19b73-840e-4be9-984b-5df6c02ece2c.jpg?v=1740577271",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Olive","Black","Brown","Beige"]
      },
      {
        id: "24",
        name: "Navy Floral Oversized Fit Shirt",
        price: 1199,
        description: "Bold floral patterns in rich navy and light blue hues make this oversized fit shirt a standout piece. Crafted from a breathable cotton blend, it offers both comfort and style. Perfect for casual outings or making a statement at social gatherings, this shirt combines high-quality fabric with an eye-catching design.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3551-02_1_e5e08109-c119-4dd0-94dd-e39dd77ac35b.jpg?v=1739283713",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Navy","Blue"]
      },
      {
        id: "25",
        name: "Brown Checks Regular Fit Shirt",
        price: 1199,
        description: "Maintain a timeless look as you transition between smart and casual in timeless style with snitch's new season collection of men's shirts. No matter what your style is, you need this full sleeve regular fit shirt in your wardrobe. It is made from 40% polyester, 60% cotton and features a roomy cut for a casual style.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/1_3602d423-981d-4353-bbfc-0168aa16952d.jpg?v=1739862812",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Brown","Beige","Blue"]
      },
      {
        id: "26",
        name: "Brown Textured Slim Fit Shirt",
        price: 1199,
        description: "Give a majestic lift to your look with this brown textured pattern shirt. The shirt is crafted from fine 99% polyester, 1% elastane. It is a versatile staple and great for teaming with jeans for a more casual look or smartening up with a classic pair of chinos.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3900-02_1_19c772f6-fe98-4b71-8d22-12619160ccae.jpg?v=1739287097",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Brown","Black","Cream","Green"]
      },
      {
        id: "27",
        name: "Navy Solid Slim Fit Button Down Shirt",
        price: 899,
        description: "Navy blue slim-fit shirt crafted from 100% cotton, featuring a button-down collar and a single chest pocket. Perfect for both casual and semi-formal occasions, this shirt offers a blend of comfort and style, making it a versatile addition to your wardrobe.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3916-06_1_0a0795ec-feea-40ec-b650-2654601f551c.jpg?v=1739423388",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Navy","Olive","Pink","Beige","Black","Maroon","Khaki","Green","White","Grey","Blue"]
      },
      {
        id: "28",
        name: "Grey Solid Slim Fit Button Down Shirt",
        price: 899,
        description: "Crisp and clean, this slim-fit shirt from Snitch features a light grey hue and a classic button-down collar. Made from 100% cotton, it offers breathable comfort and a polished look, perfect for both casual and semi-formal occasions. The short sleeves and single chest pocket add a touch of modern style.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3916-07_1_cc33db9c-d50e-4b0c-809e-4c69e17ebd69.jpg?v=1739423377",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Grey","Olive","Pink","Navy","Beige","Black","Maroon","Khaki","Green","White","Blue"]
      },
      {
        id: "29",
        name: "Purple Button Down Slim Fit Shirt",
        price: 999,
        description: "Maintain a timeless look as you transition between smart and casual in timeless style with snitch's new season collection of men's shirts. No matter what your style is, you need this full sleeve slim fit shirt in your wardrobe. It is made from 61% cotton, 39% poly and features a roomy cut for a casual style.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3917-06_1_3cee70fd-1ee3-49a1-a5b7-3e7f636e24fe.jpg?v=1738652588",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Purple","Olive","Green","White","Grey","Blue"]
      },
      {
        id: "30",
        name: "Grey Box Fit Shirt",
        price: 899,
        description: "Give your everyday wardrobe an effortless appeal with this classy grey 100% cotton shirt. Designed in a box fit, this shirt is known for its endless versatility. A look that bridges dressy and casual, with half sleeve and cuban, it is perfect to wear alone or as an outer layer.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3819-04_1_9cb291ff-2f67-40bb-90c6-2af43477ad5c.jpg?v=1741094277",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Grey","Olive","Mauve","Black","White"]
      },
      {
        id: "31",
        name: "Mauve Box Fit Shirt",
        price: 899,
        description: "Give a majestic lift to your look with this mauve plain pattern shirt. The shirt is crafted from fine 100% cotton. It is a versatile staple and great for teaming with jeans for a more casual look or smartening up with a classic pair of chinos.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3819-03_1_bd9dc907-100e-4c1d-b4c4-017733a8f34d.jpg?v=1741095018",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Mauve","Olive","Black","White","Grey"]
      },
      {
        id: "32",
        name: "Olive Box Fit Shirt",
        price: 899,
        description: "Give a majestic lift to your look with this olive plain pattern shirt. The shirt is crafted from fine 100% cotton. It is a versatile staple and great for teaming with jeans for a more casual look or smartening up with a classic pair of chinos.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3819-05_1_28026424-73aa-4fc0-90d2-e59f1b7893f5.jpg?v=1741094291",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Olive","Mauve","Black","White","Grey"]
      },
      {
        id: "33",
        name: "Beige Checks Regular Fit Shirt",
        price: 1199,
        description: "Update your everyday shirt collection with this cool and comfy regular fit full sleeve shirt from snitch. The regular fit lends you an easygoing look and with our breathable shirts in 40% polyester, 60% cotton, comfort is no longer reserved for the weekends.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3955-02_1_0e952df3-790d-41cb-8d12-113e89df9e22.jpg?v=1739862146",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Beige","Brown","Blue"]
      },
      {
        id: "34",
        name: "White Abstract Oversized Fit Shirt",
        price: 1199,
        description: "Update your everyday shirt collection with this cool and comfy oversized fit half sleeve shirt from snitch. The oversized fit lends you an easygoing look and with our breathable shirts in 58% cotton, 42% viscose, comfort is no longer reserved for the weekends.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3552-02_1_fe23c2e5-1587-42b9-a1ca-320ebfeee658.jpg?v=1741094082",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["White","Brown"]
      },
      {
        id: "35",
        name: "Brown Abstract Oversized Shirt",
        price: 1199,
        description: "Unleash bold style with this oversized fit shirt featuring a striking abstract brown and white pattern. Crafted from a premium blend of 58% cotton and 42% viscose, it offers lightweight comfort and a relaxed drape. Perfect for casual outings, this shirt combines artistic flair with everyday wearability.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3552-01_1_72f07c7d-f63d-4ff9-8ccb-3d4d74273f67.jpg?v=1740577321",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Brown","White"]
      },
      {
        id: "36",
        name: "Grey Button Down Slim Fit Shirt",
        price: 999,
        description: "Crafted from a premium cotton blend, this Slim Fit shirt in a rich charcoal hue features a button-down collar and full sleeves. Its soft texture and classic design make it a versatile addition to any wardrobe, perfect for both casual and formal occasions.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3917-07_1_97bb0047-6ae7-443c-a2f1-cc41d2d62a9c.jpg?v=1739283438",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Grey","Olive","Purple","Green","White","Blue"]
      },
      {
        id: "37",
        name: "Navy Solid Linen Blend Shirt",
        price: 1299,
        description: "Crafted from a luxurious blend of 77% Lyocell and 23% Linen, this slim-fit shirt from Snitch offers a sleek design in a rich navy hue. Perfect for both casual and formal settings, it features a classic collar and full sleeves, ensuring comfort and style at an affordable price.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3828-08_1_df4a7119-2ee6-4543-bd51-8a629756e843.jpg?v=1740577155",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Navy","Beige","Mauve","Black","Green","White","Grey","Blue"]
      },
      {
        id: "38",
        name: "Black Abstract Regular Fit Shirt",
        price: 1199,
        description: "Update your everyday shirt collection with this cool and comfy regular fit full sleeve shirt from snitch. The regular fit lends you an easygoing look and with our breathable shirts in 90.7% viscose, 9.3% nylon, comfort is no longer reserved for the weekends.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3667-01_1_d23c4ccb-555e-47ef-b040-0c9004b15d99.jpg?v=1739286764",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Black","White"]
      },
      {
        id: "39",
        name: "Blue Floral Oversized Fit Shirt",
        price: 1199,
        description: "Bold floral patterns in earthy tones make this oversized cotton-blend shirt from Snitch a standout piece. Perfect for casual outings, its breathable fabric ensures comfort while the unique design adds a touch of sophistication to your look.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3551-01_1_26c2e560-e7f2-4961-8a26-7095f10a254a.jpg?v=1739283697",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Blue","Navy"]
      },
      {
        id: "40",
        name: "Grey Solid Slim Fit Shirt",
        price: 1299,
        description: "Discover the sleek sophistication of this Slim Fit shirt from Snitch, crafted from a luxurious Rayon Blend. Its deep charcoal hue and classic collar make it a versatile addition to any wardrobe, perfect for both formal and casual occasions. Elevate your style effortlessly with this high-quality, affordable piece.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3877-04_1_034ff4cd-fa5c-415c-ab10-579bfa07193b.jpg?v=1738736468",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Grey","Navy","Mauve","Black","White","Off-White"]
      },
      {
        id: "41",
        name: "Navy Solid Slim Fit Shirt",
        price: 1299,
        description: "Crafted from a luxurious rayon blend, this slim-fit shirt from Snitch features a deep midnight navy hue that exudes sophistication. The full sleeves and classic collar make it perfect for both office and evening wear, offering a sleek, modern look at an affordable price.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3877-05_1_1b590f30-6df0-458e-9adf-4a434b10ea6f.jpg?v=1738736487",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Navy","Mauve","Black","White","Off-White","Grey"]
      },
      {
        id: "42",
        name: "Black Stripes Oversized Fit Crochet Shirt",
        price: 1299,
        description: "Elevate your wardrobe with this oversized fit crochet shirt, crafted from 100% cotton for breathable comfort. Featuring a striking black base with white vertical stripes, a Cuban collar, and half sleeves, this shirt blends modern design with timeless style—perfect for casual outings or relaxed evenings.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3773-01_1_0e79b27c-56c0-44ec-a41f-886d54e6e2df.jpg?v=1740577169",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Black","White","Cream","Off-White"]
      },
      {
        id: "43",
        name: "Olive Solid Slim Fit Mandarin Shirt",
        price: 1199,
        description: "Crafted from 100% cotton, this slim-fit shirt from Snitch features a rich olive green hue and a sleek mandarin collar. Perfect for both casual and formal settings, it offers a blend of comfort and style with its full sleeves and buttoned cuffs. Elevate your wardrobe with this versatile piece.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3994-08_1_b5b56569-b61c-474e-bf55-c0023f5eebc1.jpg?v=1739423434",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Olive","Pink","Navy","Beige","Black","Green","White","Grey","Blue"]
      },
      {
        id: "44",
        name: "Beige Solid Slim Fit Mandarin Shirt",
        price: 1199,
        description: "Crafted from 100% cotton, this slim-fit shirt from Snitch features a classic mandarin collar and full sleeves. The rich beige hue adds a touch of sophistication, making it perfect for both casual and formal settings. Experience comfort and style with this versatile piece, ideal for the modern man.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3994-09_1_eb914469-687b-471d-a8b8-535bbc079e8a.jpg?v=1739423419",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Beige","Olive","Pink","Navy","Black","Green","White","Grey","Blue"]
      },
      {
        id: "45",
        name: "Navy Solid Slim Fit Mandarin Shirt",
        price: 1199,
        description: "Crafted from 100% cotton, this slim-fit shirt from Snitch features a rich midnight navy hue and a sleek mandarin collar. Its full sleeves and buttoned cuffs add a touch of sophistication, making it perfect for both casual and formal occasions. Experience premium comfort and style at an affordable price.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3994-03_1_f334ee28-abab-4289-b595-8b9009580177.jpg?v=1739423522",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Navy","Olive","Pink","Beige","Black","Green","White","Grey","Blue"]
      },
      {
        id: "46",
        name: "Lavender Block Checks Slim Fit Shirt",
        price: 999,
        description: "Elevate your wardrobe with this slim-fit shirt from Snitch, featuring a sophisticated check pattern in a rich lavender hue. Crafted from 100% polyester, it offers a smooth texture and a modern spread collar. Perfect for both casual and formal settings, this shirt combines style and comfort effortlessly.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3847-04_1_d9e901e8-76fc-49c3-8f9c-05efe45212cc.jpg?v=1739423276",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Lavender","Olive","Beige","Mauve","White","Blue"]
      },
      {
        id: "47",
        name: "Light Beige Solid Slim Fit Shirt",
        price: 1299,
        description: "Crafted from 100% cotton, this slim-fit shirt from Snitch features a classic button-down collar and full sleeves. Its light beige hue and textured fabric offer a refined yet casual look, perfect for both office and off-duty wear. Elevate your wardrobe with this versatile and comfortable piece.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3986-02_1_c546d8d4-b6f1-4197-9df9-0d29abec2606.jpg?v=1739973868",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Beige","Olive","Navy","Maroon","Grey","Blue"]
      },
      {
        id: "48",
        name: "Blue Checks Slim Fit Shirt",
        price: 1199,
        description: "Vibrant aqua plaid pattern elevates this slim-fit shirt, featuring full sleeves and a classic button-down collar. Crafted from 100% cotton, it offers breathable comfort and a stylish look. Perfect for both casual outings and semi-formal events, this shirt combines quality and affordability for the modern man.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS4010-02_1_cfef43da-7521-4a0a-a508-a21fc28f7d91.jpg?v=1739973837",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Blue","Yellow"]
      },
      {
        id: "49",
        name: "White Solid Slim Fit Mandarin Shirt",
        price: 1199,
        description: "Crisp and clean, this slim-fit white shirt from Snitch is crafted from 100% cotton for ultimate comfort. Featuring a modern Mandarin collar and full sleeves, it’s perfect for both casual and formal occasions. Elevate your wardrobe with this versatile piece that combines style and affordability.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4mss3994-02_1_b9a4ce18-18df-4946-8ca8-c5be34ca1d4d.jpg?v=1739423538",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["White","Olive","Pink","Navy","Beige","Black","Green","Grey","Blue"]
      },
      {
        id: "50",
        name: "Black Stripes Slim Fit Shirt",
        price: 1299,
        description: "Striking black and grey vertical stripes define this slim-fit shirt from Snitch, crafted from a soft rayon blend for all-day comfort. Featuring a classic collar and full sleeves, it's perfect for both casual and semi-formal occasions. Elevate your wardrobe with this versatile piece that combines style and affordability.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS3954-03_1_a05dac76-8a6b-4afd-a404-1a700c02fbd3.jpg?v=1739339143",
        category: "Shirts",
        brand: "Snitch",
        size: ["S","M","L","XL"],
        color: ["Black","White","Beige"]
      }
    ];
    
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  // Filter products when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
    // Reset current index when filtered products change
    setCurrentIndex(0);
  }, [searchQuery, products]);

  const handleSwipe = (direction: string) => {
    if (currentIndex < filteredProducts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleAddToCart = () => {
    if (filteredProducts.length > 0) {
      const currentProduct = filteredProducts[currentIndex];
      addToCart(currentProduct);
    }
  };

  const handleAddToFavorites = () => {
    if (filteredProducts.length > 0) {
      const currentProduct = filteredProducts[currentIndex];
      addToFavorites(currentProduct);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-24">
      <div className="py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="relative">
        {filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center min-h-64 mt-8">
            <p className="text-gray-500">No products match your search.</p>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            index === currentIndex && (
              <ProductCard
                key={product.id}
                product={product}
                onSwipe={handleSwipe}
                onAddToCart={handleAddToCart}
                onAddToFavorites={handleAddToFavorites}
              />
            )
          ))
        )}
      </div>
    </div>
  );
}