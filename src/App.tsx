import { useMemo } from "react";
import Component from "./components/bill-of-lading";
import "./App.css";
import { client, useConfig, useVariable, useElementData, useElementColumns } from "@sigmacomputing/plugin";

client.config.configureEditorPanel([
  { name: "source", type: "element" },
  { name: "shipFromAddress", type: "column", source: "source", allowMultiple: false },
  { name: "shipFromName", type: "variable" },
  { name: "shipFromAdditionalName", type: "variable" },
  { name: "bolNumber", type: "variable" },
  { name: "carrierProNumber", type: "variable" },
]);

function App() {
  const config = useConfig();
  const sigmaData = useElementData(config.source);
  const columnInfo = useElementColumns(config.source);

  // Define all your field names
  const fields = [
    "shipDate",
    "bolNumber",
    "shipFromName",
    "shipFromAdditionalName",
    "shipFromAddress",
    "shipFromCityStateZip",
    "shipFromSid",
    "shipFromSn",
    "shipFromFob",
    "shipToName",
    "shipToAdditionalName",
    "shipToAddress",
    "shipToCityStateZip",
    "shipToCid",
    "shipToFob",
    "thirdPartyName",
    "thirdPartyAddress",
    "thirdPartyCityStateZip",
    "carrierName",
    "carrierTrailerNumber",
    "carrierSealNumbers",
    "carrierScac",
    "carrierProNumber",
    "freightChargePrepaid",
    "freightChargeCollect",
    "freightChargeThirdParty",
    "freightChargeMasterBol",
    "warehouseInstructions",
    "attnCarrier",
    "chepAccount",
    "sccOrder",
    "customerOrderNumber",
    "customerOrderPackages",
    "customerOrderWeight",
    "customerOrderPalletSlip",
    "customerOrderAdditionalInfo",
    "codAmount",
    "feeTermsCollect",
    "feeTermsPrepaid",
    "customerCheckAcceptable",
  ] as const;

  const shipFromAddress = useMemo(() => {
    const shipFromAddressId = Object.keys(columnInfo).find(
      key => columnInfo[key].name === 'shipFromAddress'
    );
    
    if (shipFromAddressId && sigmaData[shipFromAddressId]) {
      return sigmaData[shipFromAddressId][0] || '';
    }
    
    return '';
  }, [sigmaData, columnInfo]);












  // Helper function
  const getValueFromVariable = (variable: any): string => {
    return (variable?.defaultValue as unknown as { value: string })?.value ?? "";
  };

  // Create an object with all variables
  const variables = Object.fromEntries(fields.map((field) => [field, useVariable(config[field])[0]]));

  // Create memoized values for all variables
  const values = Object.fromEntries(
    fields.map((field) => [field, useMemo(() => getValueFromVariable(variables[field]), [variables[field]])])
  );

  // Sample carrier details - you may want to make this dynamic based on your needs
  const carrierDetails = [
    {
      handlingUnit: { qty: 23, type: "CHEP" },
      package: { qty: 46, type: "CS" },
      weight: 1000,
      hazmatX: false,
      description: "Packaged goods",
      nmfcNumber: "12345",
      class: "50",
    },
    {
      handlingUnit: { qty: 2, type: "WW" },
      package: { qty: 4, type: "CS" },
      weight: 200,
      hazmatX: false,
      description: "Additional goods",
      nmfcNumber: "67890",
      class: "55",
    },
  ];

  return (
    <Component
      shipDate={values.shipDate}
      bolNumber={values.bolNumber}
      shipFrom={{
        name: values.shipFromName,
        additionalName: values.shipFromAdditionalName,
        address: shipFromAddress,
        cityStateZip: values.shipFromCityStateZip,
        sid: values.shipFromSid,
        sn: values.shipFromSn,
        fob: Boolean(values.shipFromFob),
      }}
      shipTo={{
        name: values.shipToName,
        additionalName: values.shipToAdditionalName,
        address: values.shipToAddress,
        cityStateZip: values.shipToCityStateZip,
        cid: values.shipToCid,
        fob: Boolean(values.shipToFob),
      }}
      thirdParty={{
        name: values.thirdPartyName,
        address: values.thirdPartyAddress,
        cityStateZip: values.thirdPartyCityStateZip,
      }}
      carrier={{
        name: values.carrierName,
        trailerNumber: values.carrierTrailerNumber,
        sealNumbers: values.carrierSealNumbers,
        scac: values.carrierScac,
        proNumber: values.carrierProNumber,
      }}
      freightChargeTerms={{
        prepaid: Boolean(values.freightChargePrepaid),
        collect: Boolean(values.freightChargeCollect),
        thirdParty: Boolean(values.freightChargeThirdParty),
        masterBol: Boolean(values.freightChargeMasterBol),
      }}
      specialInstructions={{
        warehouseInstructions: values.warehouseInstructions,
        attnCarrier: values.attnCarrier,
        chepAccount: values.chepAccount,
        sccOrder: values.sccOrder,
      }}
      customerOrder={{
        orderNumber: values.customerOrderNumber,
        packages: Number(values.customerOrderPackages) || 0,
        weight: Number(values.customerOrderWeight) || 0,
        palletSlip: values.customerOrderPalletSlip,
        additionalInfo: values.customerOrderAdditionalInfo,
      }}
      carrierDetails={carrierDetails}
      codAmount={values.codAmount}
      feeTermsCollect={Boolean(values.feeTermsCollect)}
      feeTermsPrepaid={Boolean(values.feeTermsPrepaid)}
      customerCheckAcceptable={Boolean(values.customerCheckAcceptable)}
    />
  );
}

export default App;
