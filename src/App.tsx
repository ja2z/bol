import { useMemo } from "react";
import Component from "./components/bill-of-lading";
import "./App.css";
import { client, useConfig, useVariable, useElementData, useElementColumns } from "@sigmacomputing/plugin";

client.config.configureEditorPanel([
  { name: "source", type: "element" },
  { name: "shipDate", type: "column", source: "source", allowMultiple: false },
  { name: "bolNumber", type: "column", source: "source", allowMultiple: false },
  { name: "shipFromName", type: "column", source: "source", allowMultiple: false },
  { name: "shipFromAdditionalName", type: "column", source: "source", allowMultiple: false },
  { name: "shipFromAddress", type: "column", source: "source", allowMultiple: false },
  { name: "shipFromCityStateZip", type: "column", source: "source", allowMultiple: false },
  { name: "shipFromSid", type: "column", source: "source", allowMultiple: false },
  { name: "shipFromSn", type: "column", source: "source", allowMultiple: false },
  { name: "shipFromFob", type: "column", source: "source", allowMultiple: false },
  { name: "shipToName", type: "column", source: "source", allowMultiple: false },
  { name: "shipToAdditionalName", type: "column", source: "source", allowMultiple: false },
  { name: "shipToAddress", type: "column", source: "source", allowMultiple: false },
  { name: "shipToCityStateZip", type: "column", source: "source", allowMultiple: false },
  { name: "shipToCid", type: "column", source: "source", allowMultiple: false },
  { name: "shipToFob", type: "column", source: "source", allowMultiple: false },
  { name: "thirdPartyName", type: "column", source: "source", allowMultiple: false },
  { name: "thirdPartyAddress", type: "column", source: "source", allowMultiple: false },
  { name: "thirdPartyCityStateZip", type: "column", source: "source", allowMultiple: false },
  { name: "carrierName", type: "column", source: "source", allowMultiple: false },
  { name: "carrierTrailerNumber", type: "column", source: "source", allowMultiple: false },
  { name: "carrierSealNumbers", type: "column", source: "source", allowMultiple: false },
  { name: "carrierScac", type: "column", source: "source", allowMultiple: false },
  { name: "carrierProNumber", type: "column", source: "source", allowMultiple: false },
  { name: "freightChargePrepaid", type: "column", source: "source", allowMultiple: false },
  { name: "freightChargeCollect", type: "column", source: "source", allowMultiple: false },
  { name: "freightChargeThirdParty", type: "column", source: "source", allowMultiple: false },
  { name: "freightChargeMasterBol", type: "column", source: "source", allowMultiple: false },
  { name: "warehouseInstructions", type: "column", source: "source", allowMultiple: false },
  { name: "attnCarrier", type: "column", source: "source", allowMultiple: false },
  { name: "chepAccount", type: "column", source: "source", allowMultiple: false },
  { name: "sccOrder", type: "column", source: "source", allowMultiple: false },
  { name: "customerOrderNumber", type: "column", source: "source", allowMultiple: false },
  { name: "customerOrderPackages", type: "column", source: "source", allowMultiple: false },
  { name: "customerOrderWeight", type: "column", source: "source", allowMultiple: false },
  { name: "customerOrderPalletSlip", type: "column", source: "source", allowMultiple: false },
  { name: "customerOrderAdditionalInfo", type: "column", source: "source", allowMultiple: false },
  { name: "codAmount", type: "column", source: "source", allowMultiple: false },
  { name: "feeTermsCollect", type: "column", source: "source", allowMultiple: false },
  { name: "feeTermsPrepaid", type: "column", source: "source", allowMultiple: false },
  { name: "customerCheckAcceptable", type: "column", source: "source", allowMultiple: false },
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

  const fieldValues = useMemo(() => {
    const getFieldValue = (fieldName: (typeof fields)[number]) => {
      const fieldId = Object.keys(columnInfo).find((key) => columnInfo[key].name === fieldName);

      if (fieldId && sigmaData[fieldId]) {
        return sigmaData[fieldId][0] || "";
      }
      return "";
    };

    return fields.reduce((acc, field) => {
      acc[field] = getFieldValue(field);
      return acc;
    }, {} as Record<(typeof fields)[number], string>);
  }, [sigmaData, columnInfo]);

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
      shipDate={fieldValues.shipDate}
      bolNumber={fieldValues.bolNumber}
      shipFrom={{
        name: fieldValues.shipFromName,
        additionalName: fieldValues.shipFromAdditionalName,
        address: fieldValues.shipFromAddress,
        cityStateZip: fieldValues.shipFromCityStateZip,
        sid: fieldValues.shipFromSid,
        sn: fieldValues.shipFromSn,
        fob: Boolean(fieldValues.shipFromFob),
      }}
      shipTo={{
        name: fieldValues.shipToName,
        additionalName: fieldValues.shipToAdditionalName,
        address: fieldValues.shipToAddress,
        cityStateZip: fieldValues.shipToCityStateZip,
        cid: fieldValues.shipToCid,
        fob: Boolean(fieldValues.shipToFob),
      }}
      thirdParty={{
        name: fieldValues.thirdPartyName,
        address: fieldValues.thirdPartyAddress,
        cityStateZip: fieldValues.thirdPartyCityStateZip,
      }}
      carrier={{
        name: fieldValues.carrierName,
        trailerNumber: fieldValues.carrierTrailerNumber,
        sealNumbers: fieldValues.carrierSealNumbers,
        scac: fieldValues.carrierScac,
        proNumber: fieldValues.carrierProNumber,
      }}
      freightChargeTerms={{
        prepaid: Boolean(fieldValues.freightChargePrepaid),
        collect: Boolean(fieldValues.freightChargeCollect),
        thirdParty: Boolean(fieldValues.freightChargeThirdParty),
        masterBol: Boolean(fieldValues.freightChargeMasterBol),
      }}
      specialInstructions={{
        warehouseInstructions: fieldValues.warehouseInstructions,
        attnCarrier: fieldValues.attnCarrier,
        chepAccount: fieldValues.chepAccount,
        sccOrder: fieldValues.sccOrder,
      }}
      customerOrder={{
        orderNumber: fieldValues.customerOrderNumber,
        packages: Number(fieldValues.customerOrderPackages) || 0,
        weight: Number(fieldValues.customerOrderWeight) || 0,
        palletSlip: fieldValues.customerOrderPalletSlip,
        additionalInfo: fieldValues.customerOrderAdditionalInfo,
      }}
      carrierDetails={carrierDetails}
      codAmount={fieldValues.codAmount}
      feeTermsCollect={Boolean(fieldValues.feeTermsCollect)}
      feeTermsPrepaid={Boolean(fieldValues.feeTermsPrepaid)}
      customerCheckAcceptable={Boolean(fieldValues.customerCheckAcceptable)}
    />
  );

  /*


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
  */
}

export default App;
