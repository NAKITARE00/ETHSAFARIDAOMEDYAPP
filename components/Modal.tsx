import { useEffect } from "react";


const Modal = ({ setModalOpen, contract }) => {
  const sharing = () => {
    const address = document.querySelector(".address").value;
    contract.allow(address);
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer bg-white p-4 rounded-lg shadow-lg">
          <div className="title text-lg font-semibold">Share with</div>
          <div className="body mt-2">
            <input
              type="text"
              className="address border rounded-lg p-2 w-full"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber" className="mt-2 border rounded-lg p-2 w-full">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer mt-4 flex justify-end">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              onClick={() => sharing()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
