import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("anevora_cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
      return [];
    }
  });

  // Save cart in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "anevora_cart",
        JSON.stringify(cart)
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [cart]);

  /*
    Creates a unique key for every product variation.

    Example:
    product-01 + Medium + Black
    product-01 + Large + Black

    These will be treated as different cart items.
  */
  function createCartKey(
    product,
    selectedSize = null,
    selectedColor = null
  ) {
    const productId =
      product?.id || product?.productId || "unknown-product";

    const sizeKey = selectedSize || "default-size";
    const colorKey = selectedColor || "default-color";

    return `${productId}-${sizeKey}-${colorKey}`;
  }

  /*
    Add product to cart

    Existing ProductDetails code can still call:
    addToCart(product, quantity, selectedSize)

    It will also support:
    addToCart(product, quantity, selectedSize, selectedColor)
  */
  function addToCart(
    product,
    quantity = 1,
    selectedSize = null,
    selectedColor = null
  ) {
    if (!product) {
      return;
    }

    const stock =
      typeof product.stock === "number"
        ? product.stock
        : Infinity;

    if (stock <= 0) {
      return;
    }

    const safeQuantity = Math.max(
      1,
      Number(quantity) || 1
    );

    const cartKey = createCartKey(
      product,
      selectedSize,
      selectedColor
    );

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.cartKey === cartKey
      );

      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + safeQuantity,
          stock
        );

        return currentCart.map((item) =>
          item.cartKey === cartKey
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item
        );
      }

      const finalQuantity = Math.min(
        safeQuantity,
        stock
      );

      return [
        ...currentCart,
        {
          ...product,
          id: product.id || product.productId,
          productId:
            product.productId || product.id,
          cartKey,
          selectedSize,
          selectedColor,
          quantity: finalQuantity,
        },
      ];
    });
  }

  // Remove complete item/variation from cart
  function removeFromCart(cartKey) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.cartKey !== cartKey
      )
    );
  }

  // Update quantity directly
  function updateQuantity(cartKey, quantity) {
    const requestedQuantity = Number(quantity);

    if (
      !Number.isFinite(requestedQuantity) ||
      requestedQuantity <= 0
    ) {
      removeFromCart(cartKey);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.cartKey !== cartKey) {
          return item;
        }

        const stock =
          typeof item.stock === "number"
            ? item.stock
            : Infinity;

        const finalQuantity = Math.min(
          Math.floor(requestedQuantity),
          stock
        );

        return {
          ...item,
          quantity: finalQuantity,
        };
      })
    );
  }

  // Increase quantity by 1
  function increaseQuantity(cartKey) {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.cartKey !== cartKey) {
          return item;
        }

        const stock =
          typeof item.stock === "number"
            ? item.stock
            : Infinity;

        if (item.quantity >= stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  }

  // Decrease quantity by 1
  function decreaseQuantity(cartKey) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.cartKey === cartKey
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove everything from cart
  function clearCart() {
    setCart([]);
  }

  // Total number of physical items
  const itemCount = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total + (Number(item.quantity) || 0),
        0
      ),
    [cart]
  );

  // Cart subtotal
  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total +
          (Number(item.price) || 0) *
            (Number(item.quantity) || 0),
        0
      ),
    [cart]
  );

  /*
    Useful for future checkout/order processing.

    Example:
    cartTotal = subtotal
  */
  const cartTotal = useMemo(
    () => subtotal,
    [subtotal]
  );

  const value = {
    cart,
    itemCount,
    subtotal,
    cartTotal,

    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider."
    );
  }

  return context;
}