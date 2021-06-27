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
