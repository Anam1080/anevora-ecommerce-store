import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist =
        localStorage.getItem("anevora_wishlist");

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "anevora_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  function addToWishlist(product) {
    setWishlist((currentWishlist) => {
      if (
        currentWishlist.some(
          (item) => item.id === product.id
        )
      ) {
        return currentWishlist;
      }

      return [...currentWishlist, product];
    });
  }

  function removeFromWishlist(productId) {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => item.id !== productId
      )
    );
  }

  function toggleWishlist(product) {
    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  function isWishlisted(productId) {
    return wishlist.some(
      (item) => item.id === productId
    );
  }

  function clearWishlist() {
    setWishlist([]);
  }

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isWishlisted,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider."
    );
  }

  return context;
}