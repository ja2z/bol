import { useMemo } from "react";
import Component from "./components/bill-of-lading";
import "./App.css";
import { client, useConfig, useVariable } from "@sigmacomputing/plugin";

client.config.configureEditorPanel([
  { name: "shipFromName", type: "variable" },
  { name: "shipFromCorporation", type: "variable" },
]);

function App() {
  const config = useConfig();

  // Define all your variables
  const variables = {
    shipFromName: useVariable(config.shipFromName)[0],
    shipFromCorporation: useVariable(config.shipFromCorporation)[0],
    // ... add other variables
  };

  // Helper function
  const getValueFromVariable = (variable: any): string => {
    return (variable?.defaultValue as unknown as { value: string })?.value ?? "";
  };

  // Create memoized values for all variables
  const values = {
    shipFromName: useMemo(() => 
      getValueFromVariable(variables.shipFromName),
      [variables.shipFromName]
    ),
    shipFromCorporation: useMemo(() => 
      getValueFromVariable(variables.shipFromCorporation),
      [variables.shipFromCorporation]
    ),
    // ... repeat for other variables
  };

  return (
    <Component
      shipFromName={values.shipFromName}
      shipFromCorporation={values.shipFromCorporation}
      // ... other props
      shipFromAddress="3010 Saddle Creek Road"
      shipFromCityStateZip="Lakeland, FL 33801"
      shipFromSID="0058642759"
      shipFromSN="0058642759"
      shipFromFOB={false}
      shipToName="PUBLIX SUPERMKTS / BOYNTON Loc#"
      shipToAddress="5500 PARK RIDGE BLVD"
      shipToCityStateZip="BOYNTON BEACH, FL 33426"
      shipToCID="0001400366"
      shipToFOB={true}
      thirdPartyName="Riviana Foods, Inc."
      thirdPartyAddress="c/o Cass Information Systems\nP.O. Box 67"
      thirdPartyCityStateZip="St. Louis, MO 63166-0067"
      billOfLadingNumber="00174000586427592"
      carrierName="Saddle Creek Transportation"
      trailerNumber="21105"
      sealNumbers="1280131"
      scac="SDLC"
      proNumber="L2004853"
      freightChargePrepaid={true}
      freightChargeCollect={false}
      freightCharge3rdParty={true}
      orderNumber="B646156-01"
      packageCount={2369}
      weight="36,530 LBS"
      specialInstructions="Warehouse Inst.: none | Order Inst.: VR114601 BRETT BIGGS, TE 8636881188"
      shipDate="10/23/2024 12:15:00 AM"
      arriveDate="10/24/2024 12:15:00 AM"
      commodityDescription="Foodstuffs, other than frozen, Group IV, viz"
      nmfcNumber="73260"
      handlingUnits={[
        { qty: 23, type: "CHEP" },
        { qty: 2, type: "WW" },
      ]}
      codAmount=""
      feeTermsCollect={false}
      feeTermsPrepaid={false}
      customerCheckAcceptable={false}
    />
  );
}

export default App;
