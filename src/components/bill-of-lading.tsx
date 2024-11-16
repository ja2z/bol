//import React from 'react'
import Barcode from 'react-barcode'

interface BillOfLadingProps {
  shipFromName: string
  shipFromCorporation: string
  shipFromAddress: string
  shipFromCityStateZip: string
  shipFromSID: string
  shipFromSN: string
  shipFromFOB: boolean
  shipToName: string
  shipToAddress: string
  shipToCityStateZip: string
  shipToCID: string
  shipToFOB: boolean
  thirdPartyName: string
  thirdPartyAddress: string
  thirdPartyCityStateZip: string
  billOfLadingNumber: string
  carrierName: string
  trailerNumber: string
  sealNumbers: string
  scac: string
  proNumber: string
  freightChargePrepaid: boolean
  freightChargeCollect: boolean
  freightCharge3rdParty: boolean
  orderNumber: string
  packageCount: number
  weight: string
  specialInstructions: string
  shipDate: string
  arriveDate: string
  commodityDescription: string
  nmfcNumber: string
  handlingUnits: Array<{ qty: number; type: string }>
  codAmount: string
  feeTermsCollect: boolean
  feeTermsPrepaid: boolean
  customerCheckAcceptable: boolean
}

export default function Component({
  shipFromName = "Riviana Foods, Inc",
  shipFromCorporation = "C/O Saddle Creek Corporation",
  shipFromAddress = "3010 Saddle Creek Road",
  shipFromCityStateZip = "Lakeland, FL 33801",
  shipFromSID = "0058642759",
  shipFromSN = "0058642759",
  shipFromFOB = false,
  shipToName = "PUBLIX SUPERMKTS / BOYNTON Loc#",
  shipToAddress = "5500 PARK RIDGE BLVD",
  shipToCityStateZip = "BOYNTON BEACH, FL 33426",
  shipToCID = "0001400366",
  shipToFOB = true,
  thirdPartyName = "Riviana Foods, Inc.",
  thirdPartyAddress = "c/o Cass Information Systems\nP.O. Box 67",
  thirdPartyCityStateZip = "St. Louis, MO 63166-0067",
  billOfLadingNumber = "00174000586427592",
  carrierName = "Saddle Creek Transportation",
  trailerNumber = "21105",
  sealNumbers = "1280131",
  scac = "SDLC",
  proNumber = "L2004853",
  freightChargePrepaid = true,
  freightChargeCollect = false,
  freightCharge3rdParty = true,
  orderNumber = "B646156-01",
  packageCount = 2369,
  weight = "36,530 LBS",
  specialInstructions = "Warehouse Inst.: none | Order Inst.: VR114601 BRETT BIGGS, TE 8636881188",
  shipDate = "10/23/2024 12:15:00 AM",
  arriveDate = "10/24/2024 12:15:00 AM",
  commodityDescription = "Foodstuffs, other than frozen, Group IV, viz",
  nmfcNumber = "73260",
  handlingUnits = [
    { qty: 23, type: "CHEP" },
    { qty: 2, type: "WW" },
  ],
  codAmount = "",
  feeTermsCollect = false,
  feeTermsPrepaid = false,
  customerCheckAcceptable = false,
}: BillOfLadingProps) {
  return (
    <div className="w-[8.5in] h-[11in] mx-auto p-4 font-mono text-[11px] overflow-hidden">
      <div className="border border-black h-full">
        {/* Header */}
        <div className="flex justify-between p-2 border-b border-black">
          <div>Ship Date: {shipDate}</div>
          <div className="text-center font-bold text-lg">BILL OF LADING</div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12">
          {/* Left Column */}
          <div className="col-span-7 border-r border-black">
            {/* Ship From */}
            <div className="border-b border-black">
              <div className="bg-black text-white px-2 py-1 text-center">SHIP FROM</div>
              <div className="p-2 space-y-1">
                <div>
                  <span className="font-bold">Name:</span> {shipFromName}
                  <div className="pl-[3.5rem]">{shipFromCorporation}</div>
                </div>
                <div>
                  <span className="font-bold">Address:</span> {shipFromAddress}
                </div>
                <div>
                  <span className="font-bold">City/State/Zip:</span> {shipFromCityStateZip}
                </div>
                <div className="flex justify-between">
                  <span>
                    <span className="font-bold">SID#</span> {shipFromSID}
                  </span>
                  <span>
                    <span className="font-bold">SN#</span> {shipFromSN}
                  </span>
                  <span>
                    <span className="font-bold">FOB:</span> {shipFromFOB ? "X" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Ship To */}
            <div className="border-b border-black">
              <div className="bg-black text-white px-2 py-1 text-center">SHIP TO</div>
              <div className="p-2 space-y-1">
                <div>
                  <span className="font-bold">Name:</span> {shipToName}
                </div>
                <div>
                  <span className="font-bold">Address:</span> {shipToAddress}
                </div>
                <div>
                  <span className="font-bold">City/State/Zip:</span> {shipToCityStateZip}
                </div>
                <div className="flex justify-between">
                  <span>
                    <span className="font-bold">CID#</span> {shipToCID}
                  </span>
                  <span>
                    <span className="font-bold">FOB:</span> {shipToFOB ? "X" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Third Party */}
            <div className="border-b border-black">
              <div className="bg-black text-white px-2 py-1 text-center">THIRD PARTY FREIGHT CHARGES BILL TO</div>
              <div className="p-2 space-y-1">
                <div>
                  <span className="font-bold">Name:</span> {thirdPartyName}
                </div>
                <div>
                  <span className="font-bold">Address:</span> {thirdPartyAddress}
                </div>
                <div>
                  <span className="font-bold">City/State/Zip:</span> {thirdPartyCityStateZip}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-5">
            <div className="p-2 border-b border-black">
              <div className="flex justify-between">
                <span className="font-bold">Bill of Lading Number:</span>
                <span>{billOfLadingNumber}</span>
              </div>
              <div className="my-2 text-center">
                <Barcode value={billOfLadingNumber} width={1} height={40} fontSize={10} />
              </div>
              <div className="space-y-1">
                <div>
                  <span className="font-bold">CARRIER NAME:</span> {carrierName}
                </div>
                <div>
                  <span className="font-bold">Trailer Number:</span> {trailerNumber}
                </div>
                <div>
                  <span className="font-bold">Seal Number(s):</span> {sealNumbers}
                </div>
              </div>
            </div>

            <div className="p-2 border-b border-black">
              <div>
                <span className="font-bold">SCAC:</span> {scac}
              </div>
              <div>
                <span className="font-bold">Pro Number:</span> {proNumber}
              </div>
              <div className="my-2 text-center">
                <Barcode value={proNumber} width={1} height={40} fontSize={10} />
              </div>
            </div>

            <div className="p-2">
              <div className="font-bold">Freight Charge Terms:</div>
              <div className="flex gap-4 my-2">
                <label className="flex items-center gap-1">
                  <span>Prepaid</span>
                  <span className="border border-black px-2">{freightChargePrepaid ? "X" : ""}</span>
                </label>
                <label className="flex items-center gap-1">
                  <span>Collect</span>
                  <span className="border border-black px-2">{freightChargeCollect ? "X" : ""}</span>
                </label>
                <label className="flex items-center gap-1">
                  <span>3rd Party</span>
                  <span className="border border-black px-2">{freightCharge3rdParty ? "X" : ""}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="border-t border-black">
          <div className="bg-black text-white px-2 py-1 text-center">SPECIAL INSTRUCTIONS</div>
          <div className="p-2">{specialInstructions}</div>
        </div>

        {/* Customer Order Information */}
        <div className="border-t border-black">
          <div className="bg-black text-white px-2 py-1 text-center">CUSTOMER ORDER INFORMATION</div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-black">
                <th className="border-r border-black p-1 text-left">CUSTOMER ORDER NUMBER</th>
                <th className="border-r border-black p-1 text-left"># PKGS</th>
                <th className="border-r border-black p-1 text-left">WEIGHT</th>
                <th className="border-r border-black p-1 text-left">PALLET/SLIP</th>
                <th className="p-1 text-left">ADDITIONAL SHIPPER INFO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r border-black p-1">{orderNumber}</td>
                <td className="border-r border-black p-1">{packageCount}</td>
                <td className="border-r border-black p-1">{weight}</td>
                <td className="border-r border-black p-1">○</td>
                <td className="p-1">DEST: , DEPT: , TYPE: , ARRIVE DATE: {arriveDate}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border-r border-black p-1 font-bold">GRAND TOTAL</td>
                <td className="border-r border-black p-1">{packageCount}</td>
                <td className="border-r border-black p-1">{weight}</td>
                <td className="border-r border-black p-1"></td>
                <td className="p-1"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Carrier Information */}
        <div className="border-t border-black">
          <div className="bg-black text-white px-2 py-1 text-center">CARRIER INFORMATION</div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-black">
                <th colSpan={2} className="border-r border-black p-1 text-left">
                  HANDLING UNIT
                </th>
                <th colSpan={2} className="border-r border-black p-1 text-left">
                  PACKAGE
                </th>
                <th className="border-r border-black p-1 text-left">WEIGHT</th>
                <th className="border-r border-black p-1 text-left">H.M.</th>
                <th className="border-r border-black p-1 text-left">COMMODITY DESCRIPTION</th>
                <th colSpan={2} className="p-1 text-left">
                  LTL ONLY
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r border-black p-1">QTY</td>
                <td className="border-r border-black p-1">TYPE</td>
                <td className="border-r border-black p-1">QTY</td>
                <td className="border-r border-black p-1">TYPE</td>
                <td className="border-r border-black p-1"></td>
                <td className="border-r border-black p-1">(X)</td>
                <td className="border-r border-black p-1"></td>
                <td className="border-r border-black p-1">NMFC #</td>
                <td className="p-1">CLASS</td>
              </tr>
              <tr>
                <td className="border-r border-black p-1"></td>
                <td className="border-r border-black p-1"></td>
                <td className="border-r border-black p-1">{packageCount}</td>
                <td className="border-r border-black p-1">CAS</td>
                <td className="border-r border-black p-1">{weight}</td>
                <td className="border-r border-black p-1"></td>
                <td className="border-r border-black p-1">{commodityDescription}</td>
                <td className="border-r border-black p-1">{nmfcNumber}</td>
                <td className="p-1"></td>
              </tr>
              {handlingUnits.map((unit, index) => (
                <tr key={index}>
                  <td className="border-r border-black p-1">{unit.qty}</td>
                  <td className="border-r border-black p-1">{unit.type}</td>
                  <td className="border-r border-black p-1"></td>
                  <td className="border-r border-black p-1"></td>
                  <td className="border-r border-black p-1"></td>
                  <td className="border-r border-black p-1"></td>
                  <td className="border-r border-black p-1"></td>
                  <td className="border-r border-black p-1"></td>
                  <td className="p-1"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        <div className="border-t border-black text-[8px] p-2 grid grid-cols-12">
          <div className="col-span-9">
            <p>Where the rate is dependent on value, shippers are required to state specifically in writing the agreed or declared value of the property as follows:</p>
            <p>"The agreed or declared value of the property is specifically stated by the shipper to be not exceeding per ."</p>
            <p className="mt-2">NOTE Liability Limitation for loss or damage in this shipment may be applicable. See 49 U.S.C. § 14706(c)(1)(A) and (B).</p>
          </div>
          <div className="col-span-3 border-l border-black pl-2">
            <p>COD Amount: ${codAmount}</p>
            <p>Fee Terms: Collect: {feeTermsCollect ? "X" : "□"} Prepaid: {feeTermsPrepaid ? "X" : "□"}</p>
            <p>Customer check acceptable: {customerCheckAcceptable ? "X" : "□"}</p>
          </div>
        </div>

        {/* Received Section and Signature */}
        <div className="border-t border-black text-[8px] p-2 grid grid-cols-12">
          <div className="col-span-9">
            <p>RECEIVED, subject to individually determined rates or contracts that have been agreed upon in writing between the carrier and shipper, if applicable, otherwise to the rates, classifications and rules that have been established by the carrier and are available to the shipper, on request, and to all applicable state and federal regulations.</p>
          </div>
          <div className="col-span-3 border-l border-black pl-2">
            <p>The carrier shall not make delivery of this shipment without payment of freight and all other lawful charges.</p>
            <p className="mt-4">SHIPPER SIGNATURE / DATE</p>
            <div className="w-full border-b border-black mt-2"></div>
            <p className="mt-2">This is to certify that the above named materials are properly classified, described, packaged, marked and labeled, and are in proper condition for transportation according to the applicable regulations of the U.S. DOT.</p>
          </div>
        </div>
      </div>
    </div>
  )
}