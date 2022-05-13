import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Button } from "react-bootstrap";

const Home = ({ marketplace, nft }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadMarketplaceItems = async () => {
    const itemCount = await marketplace.itemCount();
    let items = [];
    for (let i = i; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        // Get URL from NFT Contract
        const uri = await nft.tokenURI(item.tokenId);

        // Use URI to fetch the NFT metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();

        // Get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);

        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    setItems(items);
    setLoading(false);
  };
  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadMarketplaceItems();
  };
  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  if (loading)
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    );

  return (
    <div className="flex justify-center">
      {items.length > 0 ? (
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5"></Row>
        </div>
      ) : (
        <main style={{ padding: "1rem 0" }}>
          <h2>No listed assets</h2>
        </main>
      )}
    </div>
  );
};

export default Home;
