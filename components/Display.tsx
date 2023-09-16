import { useState } from "react";


const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");

      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank" rel="noreferrer">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt=""
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("Image Not displayed");
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter Address"
            className="border rounded-lg p-2"
          ></input>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={getdata}
          >
            Get Data
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data}
        </div>
      </div>
    </>
  );
};

export default Display;
