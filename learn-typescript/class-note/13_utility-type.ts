interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
  something: object;
}

// 상품 목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {
  // ..
}

interface ProductDetail {
  id: number;
  name: string;
  price: number;
}

// 특정 상품의 상세 정보를 나타내기 위한 함수
type ShoppingItem = Pick<Product, "id" | "name" | "price">;
function displayProductDetail(shoppingItem: ShoppingItem) {
  // ..
}

interface UpdateProduct {
  id?: number;
  name?: string;
  price?: number;
  brand?: string;
  stock?: number;
  something?: object;
}

type UpdateProduct = Partial<Product>;
// Partial 사용: 특정 상품 정보를 업데이트(갱신)하는 함수
function updateProductItem(productItem: /* Product */ Partial<Product>) {}

// 유틸리티 타입 구현하기
interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}
// interface UserProfileUpdate {
//   username?: string;
//   email?: string;
//   profilePhotoUrl?: string;
// }

// 별도 인터페이스를 선언하지 않고 그대로 갖다 쓸 수 있음
// 위에 주석처리한 인터페이스와 동일한 기능을 하는 type
// type UserProfileUpdate = {
//   username?: UserProfile["username"];
//   email?: UserProfile["email"];
//   profilePhotoUrl?: UserProfile["profilePhotoUrl"];
// };

// 축약 과정: 맵드 타입(Mapped Type)
type UserProfileUpdate = {
  [p in "username" | "email" | "profilePhotoUrl"]?: UserProfile[p];
};
type UserProfileKeys = keyof UserProfile;

// 3
type UserProfileUpdate = {
  [p in keyof UserProfile]?: UserProfile[p];
};

// 4
type Subset<T> = {
  [p in keyof T]?: T[p];
};
