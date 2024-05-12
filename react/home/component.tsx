import React, { useEffect, useState } from "react";

interface TradeModel {
  id: number;
  type: string;
  user_id: number;
  symbol: string;
  shares: number;
  price: number;
  timestamp: number;
}

export const Home: React.FC = () => {
  const [formValues, setFormValues] = useState<Partial<TradeModel>>({
    type: "",
    user_id: 0,
    symbol: "",
    shares: 0,
    price: 0,
  });

  const [trades, setTrades] = useState<Partial<TradeModel>[]>([]);

  const getTrades = async (): Promise<TradeModel[]> => {
    const response = await fetch(`${process.env.HOST}/trades`);
    const data = await response.json();
    return data;
  };

  const refetch = async () => {
    const data = await getTrades();
    setTrades(data ?? []);
  };

  useEffect(() => {
    refetch();
  }, []);

  const onDelete = async (id: number) => {
    const response = await fetch(`${process.env.HOST}/trades/${id}`, {
      method: "DELETE",
    });
    const responseJson = await response.json();
    console.log("responsJson == ", responseJson);
    await refetch();
    console.log("DELETE  DONE == ");
  };

  const onFormSubmit = async () => {
    const response = await fetch(`${process.env.HOST}/trades`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const responseJson = await response.json();
    console.log("responsJson == ", responseJson);
    await refetch();
    console.log("All DONE == ");
  };

  return (
    <div>
      Trade Form
      <form>
        <div>
          <label>Type</label>
          <input
            type="text"
            name="type"
            value={formValues.type}
            onChange={(event) => {
              setFormValues((prevFormValues) => {
                return {
                  ...prevFormValues,
                  type: event.target.value,
                };
              });
            }}
          />
        </div>
        <div>
          <label>User Id</label>
          <input
            type="number"
            name="userId"
            value={formValues.user_id}
            onChange={(event) => {
              setFormValues((prevFormValues) => {
                return {
                  ...prevFormValues,
                  user_id: parseInt(event.target.value),
                };
              });
            }}
          />
        </div>
        <div>
          <label>Shares</label>
          <input
            type="number"
            name="shares"
            value={formValues.shares}
            onChange={(event) => {
              setFormValues((prevFormValues) => {
                return {
                  ...prevFormValues,
                  shares: parseInt(event.target.value),
                };
              });
            }}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formValues.price}
            onChange={(event) => {
              setFormValues((prevFormValues) => {
                return {
                  ...prevFormValues,
                  price: parseInt(event.target.value),
                };
              });
            }}
          />
        </div>
        <button onClick={onFormSubmit}>Submit</button>
      </form>
      <div>
        <h2>Trade List</h2>
        <button onClick={refetch}>Refresh</button>
      </div>
      {trades.map((trade) => {
        return (
          <>
            <ul>
              <li>
                id: {trade.id}:{" "}
                <button
                  onClick={() => {
                    onDelete(trade.id);
                  }}
                >
                  Delete
                </button>
              </li>
              <li>Type: {trade.type}</li>
              <li>userId: {trade.user_id}</li>
              <li>Price: $ {trade.price}</li>
              <li>Time: {trade.timestamp}</li>
            </ul>
            <div>---------</div>
          </>
        );
      })}
    </div>
  );
};
