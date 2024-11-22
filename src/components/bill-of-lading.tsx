"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import { MouseEvent } from "react";
import Barcode from "react-barcode";
import "@/styles/bill-of-lading.css";

interface CustomerOrderRow {
  orderNumber: string;
  packages: number;
  weight: number;
  palletSlip: string;
  additionalInfo: string;
}

interface CarrierInfo {
  name: string;
  trailerNumber: string;
  sealNumbers: string;
  scac: string;
  proNumber: string;
}

interface HandlingUnit {
  qty: number;
  type: string;
}

interface Package {
  qty: number;
  type: string;
}

interface CarrierDetails {
  handlingUnit: HandlingUnit;
  package: Package;
  weight: number;
  hazmatX: boolean;
  description: string;
  nmfcNumber: string;
  class: string;
}

interface FreightChargeTerms {
  prepaid: boolean;
  collect: boolean;
  thirdParty: boolean;
  masterBol: boolean;
}

interface BillOfLadingProps {
  showPrintButton?: boolean;
  shipDate: string;
  bolNumber: string;
  shipFrom: {
    name: string;
    additionalName?: string;
    address: string;
    cityStateZip: string;
    sid: string;
    sn: string;
    fob: boolean;
  };
  shipTo: {
    name: string;
    additionalName?: string;
    address: string;
    cityStateZip: string;
    cid: string;
    fob: boolean;
  };
  thirdParty: {
    name: string;
    address: string;
    cityStateZip: string;
  };
  carrier: CarrierInfo;
  freightChargeTerms: FreightChargeTerms;
  specialInstructions: {
    warehouseInstructions: string;
    attnCarrier: string;
    chepAccount: string;
    sccOrder: string;
  };
  customerOrders: CustomerOrderRow[];
  carrierDetails: CarrierDetails[];
  codAmount: number;
  feeTermsCollect: boolean;
  feeTermsPrepaid: boolean;
  customerCheckAcceptable: boolean;
  fontSizeOffset?: number;
}

const Checkbox = ({ checked }: { checked: boolean }) => (
  <span className="inline-block w-4 h-4 border border-black text-center leading-4">{checked ? "X" : ""}</span>
);

export default function Component({
  showPrintButton = false,
  shipDate,
  bolNumber,
  shipFrom,
  shipTo,
  thirdParty,
  carrier,
  freightChargeTerms,
  specialInstructions,
  customerOrders,
  carrierDetails,
  codAmount,
  feeTermsCollect,
  feeTermsPrepaid,
  customerCheckAcceptable,
  fontSizeOffset = -2,
}: BillOfLadingProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Bill of Lading",
    contentRef: componentRef,
  } as any);

  const onClickPrint = (_e: MouseEvent<HTMLButtonElement>) => {
    handlePrint();
  };

  const totalCustomerOrderWeight = customerOrders.reduce((sum, order) => sum + order.weight, 0);
  const totalCustomerOrderPackages = customerOrders.reduce((sum, order) => sum + order.packages, 0);
  const totalCarrierWeight = carrierDetails.reduce((sum, detail) => sum + detail.weight, 0);
  const totalHandlingUnitQty = carrierDetails.reduce((sum, detail) => sum + detail.handlingUnit.qty, 0);
  const totalPackageQty = carrierDetails.reduce((sum, detail) => sum + detail.package.qty, 0);

  const fontSizeClass = `text-[${14 + fontSizeOffset}px]`;

  return (
    <div className="w-full max-w-[8.5in] mx-auto">
      {showPrintButton && (
        <Button onClick={onClickPrint} className="mb-4">
          Print BOL
        </Button>
      )}

      <div
        ref={componentRef}
        className={`w-[8.5in] min-h-[11in] p-4 bg-white bol-wrapper ${fontSizeClass} text-left`}
      >
        {/* Header */}
        <div className="border border-black">
          <div className="flex justify-between p-2 border-b border-black">
            <div>Ship Date: {shipDate}</div>
            <div className="font-bold">BILL OF LADING</div>
          </div>

          {/* TOP_LEFT_SECTION and TOP_RIGHT_SECTION */}
          <div className="flex">
            {/* TOP_LEFT_SECTION */}
            <div className="w-1/2 border-r border-black">
              {/* SHIP FROM */}
              <div className="border-b border-black p-2">
                <div className="text-center font-bold bg-black text-white mb-2">SHIP FROM</div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4 items-baseline">
                  <div>Name:</div>
                  <div>{shipFrom.name}</div>
                  {shipFrom.additionalName && <div className="col-start-2">{shipFrom.additionalName}</div>}
                  <div>Address:</div>
                  <div>{shipFrom.address}</div>
                  <div>City/State/Zip:</div>
                  <div>{shipFrom.cityStateZip}</div>
                  <div className="col-span-2 flex justify-between items-center">
                    <span>SID#: {shipFrom.sid}</span>
                    <span>SN#: {shipFrom.sn}</span>
                    <span>
                      FOB: <Checkbox checked={shipFrom.fob} />
                    </span>
                  </div>
                </div>
              </div>

              {/* SHIP TO */}
              <div className="border-b border-black p-2">
                <div className="text-center font-bold bg-black text-white mb-2">SHIP TO</div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4 items-baseline">
                  <div>Name:</div>
                  <div>{shipTo.name}</div>
                  {shipTo.additionalName && <div className="col-start-2">{shipTo.additionalName}</div>}
                  <div>Address:</div>
                  <div>{shipTo.address}</div>
                  <div>City/State/Zip:</div>
                  <div>{shipTo.cityStateZip}</div>
                  <div className="col-span-2 flex justify-between items-center">
                    <span>CID#: {shipTo.cid}</span>
                    <span>
                      FOB: <Checkbox checked={shipTo.fob} />
                    </span>
                  </div>
                </div>
              </div>

              {/* THIRD PARTY FREIGHT CHARGES BILL TO */}
              <div className="p-2">
                <div className="text-center font-bold bg-black text-white mb-2">
                  THIRD PARTY FREIGHT CHARGES BILL TO
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4 items-baseline">
                  <div>Name:</div>
                  <div>{thirdParty.name}</div>
                  <div>Address:</div>
                  <div>{thirdParty.address}</div>
                  <div>City/State/Zip:</div>
                  <div>{thirdParty.cityStateZip}</div>
                </div>
              </div>
            </div>

            {/* TOP_RIGHT_SECTION */}
            <div className="w-1/2">
              {/* Bill of Lading Number */}
              <div className="border-b border-black p-2">
                <div>Bill of Lading Number: {bolNumber}</div>
                <Barcode value={bolNumber} width={1} height={30} displayValue={false} />
              </div>

              {/* CARRIER NAME */}
              <div className="border-b border-black p-2">
                <div>CARRIER NAME: {carrier.name}</div>
                <div>Trailer Number: {carrier.trailerNumber}</div>
                <div>Seal Number(s): {carrier.sealNumbers}</div>
              </div>

              {/* SCAC */}
              <div className="border-b border-black p-2">
                <div>SCAC: {carrier.scac}</div>
                <div>Pro Number: {carrier.proNumber}</div>
                <Barcode value={carrier.proNumber} width={1} height={30} displayValue={false} />
              </div>

              {/* Freight Charge Terms */}
              <div className="border-b border-black p-2">
                <div>Freight Charge Terms: (freight charges are prepaid unless marked otherwise)</div>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    Prepaid <Checkbox checked={freightChargeTerms.prepaid} />
                  </div>
                  <div>
                    Collect <Checkbox checked={freightChargeTerms.collect} />
                  </div>
                  <div>
                    3rd Party <Checkbox checked={freightChargeTerms.thirdParty} />
                  </div>
                </div>
              </div>

              {/* Master Bill of Lading */}
              <div className="p-2">
                <Checkbox checked={freightChargeTerms.masterBol} /> Master Bill of Lading with attached
                underlying Bills of Lading
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="border-t border-b border-black p-2">
            <div className="text-center font-bold bg-black text-white mb-2">SPECIAL INSTRUCTIONS</div>
            <div className="grid grid-cols-2">
              <div>{specialInstructions.warehouseInstructions}</div>
              <div>
                <div>ATTN CARRIER: {specialInstructions.attnCarrier}</div>
                <div>CHEP ACCOUNT #: {specialInstructions.chepAccount}</div>
                <div>SCC Order #: {specialInstructions.sccOrder}</div>
              </div>
            </div>
          </div>

          {/* Customer Order Information */}
          <div className="border-b border-black">
            <div className="text-center font-bold bg-black text-white">CUSTOMER ORDER INFORMATION</div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-black">
                  <th className="border-r border-black p-1">CUSTOMER ORDER NUMBER</th>
                  <th className="border-r border-black p-1"># PKGS</th>
                  <th className="border-r border-black p-1">WEIGHT</th>
                  <th className="border-r border-black p-1">PALLET/SLIP</th>
                  <th className="p-1">ADDITIONAL SHIPPER INFO</th>
                </tr>
              </thead>
              <tbody>
                {customerOrders.map((order, index) => (
                  <tr key={index} className="border-b border-black">
                    <td className="border-r border-black p-1">{order.orderNumber}</td>
                    <td className="border-r border-black p-1 text-center">{order.packages}</td>
                    <td className="border-r border-black p-1 text-center">{order.weight} LBS</td>
                    <td className="border-r border-black p-1 text-center">{order.palletSlip}</td>
                    <td className="p-1">{order.additionalInfo}</td>
                  </tr>
                ))}
                <tr className="border-t border-black font-bold">
                  <td className="border-r border-black p-1">GRAND TOTAL</td>
                  <td className="border-r border-black p-1 text-center">{totalCustomerOrderPackages}</td>
                  <td className="border-r border-black p-1 text-center">{totalCustomerOrderWeight} LBS</td>
                  <td className="border-r border-black p-1 bg-gray-300"></td>
                  <td className="p-1 bg-gray-300"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Carrier Information */}
          <div className="border-b border-black">
            <div className="text-center font-bold bg-black text-white">CARRIER INFORMATION</div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-black">
                  <th colSpan={2} className="border-r border-black p-1">
                    HANDLING UNIT
                  </th>
                  <th colSpan={2} className="border-r border-black p-1">
                    PACKAGE
                  </th>
                  <th rowSpan={2} className="border-r border-black p-1">
                    WEIGHT
                  </th>
                  <th rowSpan={2} className="border-r border-black p-1">
                    H.M. (X)
                  </th>
                  <th rowSpan={2} className="border-r border-black p-1">
                    COMMODITY DESCRIPTION
                  </th>
                  <th colSpan={2} className="p-1">
                    LTL ONLY
                  </th>
                </tr>
                <tr className="border-b border-black">
                  <th className="border-r border-black p-1">QTY</th>
                  <th className="border-r border-black p-1">TYPE</th>
                  <th className="border-r border-black p-1">QTY</th>
                  <th className="border-r border-black p-1">TYPE</th>
                  <th className="border-r border-black p-1">NMFC #</th>
                  <th className="p-1">CLASS</th>
                </tr>
              </thead>
              <tbody>
                {carrierDetails.map((detail, index) => (
                  <tr key={index} className="border-b border-black">
                    <td className="border-r border-black p-1 text-center">{detail.handlingUnit.qty}</td>
                    <td className="border-r border-black p-1 text-center">{detail.handlingUnit.type}</td>
                    <td className="border-r border-black p-1 text-center">{detail.package.qty}</td>
                    <td className="border-r border-black p-1 text-center">{detail.package.type}</td>
                    <td className="border-r border-black p-1 text-center">{detail.weight} LBS</td>
                    <td className="border-r border-black p-1 text-center">
                      <Checkbox checked={detail.hazmatX} />
                    </td>
                    <td className="border-r border-black p-1">{detail.description}</td>
                    <td className="border-r border-black p-1 text-center">{detail.nmfcNumber}</td>
                    <td className="p-1 text-center">{detail.class}</td>
                  </tr>
                ))}
                <tr className="border-t border-black font-bold">
                  <td className="border-r border-black p-1 text-center">{totalHandlingUnitQty}</td>
                  <td className="border-r border-black p-1"></td>
                  <td className="border-r border-black p-1 text-center">{totalPackageQty}</td>
                  <td className="border-r border-black p-1"></td>
                  <td className="border-r border-black p-1 text-center">{totalCarrierWeight} LBS</td>
                  <td className="border-r border-black p-1"></td>
                  <td className="border-r border-black p-1">GRAND TOTAL</td>
                  <td className="border-r border-black p-1"></td>
                  <td className="p-1"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Rate Dependent and COD Sections */}
          <div className="flex border-b border-black">
            <div className="w-3/5 border-r border-black p-2 text-xs">
              Where the rate is dependent on value, shippers are required to state specifically in writing the
              agreed or declared value of the property as follows: "The agreed or declared value of the
              property is specifically stated by the shipper to be not exceeding ___ per ___."
            </div>
            <div className="w-2/5 p-2">
              <div>
                COD Amount: ${codAmount} <span className="inline-block w-20 border-b border-black"></span>
              </div>
              <div>
                Fee Terms: Collect <Checkbox checked={feeTermsCollect} />
                Prepaid <Checkbox checked={feeTermsPrepaid} />
              </div>
              <div>
                Customer Check Acceptable: <Checkbox checked={customerCheckAcceptable} />
              </div>
            </div>
          </div>

          {/* LIABILITY_NOTE */}
          <div className="border-b border-black p-2 text-xs">
            NOTE: Liability limitation for loss or damage in this shipment may be applicable. See 49 U.S.C.
            §14706(c)(1)(A) and (B).
          </div>

          {/* RECEIVED_TEXT and SHIPPER_SIGNATURE */}
          <div className="flex">
            <div className="w-1/2 border-r border-black p-2 text-xs">
              RECEIVED, subject to individually determined rates or contracts that have been agreed upon in
              writing between the carrier and shipper, if applicable, otherwise to the rates, classifications
              and rules that have been established by the carrier and are available to the shipper, on
              request, and to all applicable state and federal regulations.
            </div>
            <div className="w-1/2 p-2">
              <div className="text-xs mb-4">
                The carrier shall not make delivery of this shipment without payment of freight and all other
                lawful charges.
              </div>
              <div className="mt-16 border-t border-black pt-1">SHIPPER SIGNATURE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
