import '@ututrust/web-components';
import { ethers } from "ethers";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "x-utt-balance": any;
      "x-utu-app-link": any;
      "x-utu-wallet-disconnect": any;
      "x-utu-root": any;
      "x-utu-recommendation": any;
      "x-utu-feedback-details-popup": any;
      "x-utu-feedback-form-popup": any;
    }
  }
}

let getId = (assetIdentifier: string) => {
  return ethers
    .id(assetIdentifier)
    .slice(0, 40 + 2)
    .toLowerCase()
}

export default function Offers(props: any) {
  let offers = props.offers;
  let _window: any = window;
  let provider = _window.ethereum;
  let walletAddress = provider.selectedAddress;

  return (
    <div className="offers bg-white p-4 rounded-lg shadow-md">
      <ul>
        {offers.map((offer: any) => (
          <li className="offer" key={offer.id}>
            <div className="font-bold">{offer.name}</div>
            <x-utu-root
              source-uuid={walletAddress}
              target-type="provider"
              target-uuids={getId(offer.id)}>
              <x-utu-recommendation className="mt-[-20px]" target-uuid={getId(offer.id)} />
            </x-utu-root>
            <br />
            <x-utu-feedback-details-popup
              target-uuid={getId(offer.id)}
              source-uuid={walletAddress}
            />
            <x-utu-feedback-form-popup
              source-uuid={walletAddress}
              target-uuid={getId(offer.id)}
              transaction-id={5}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}