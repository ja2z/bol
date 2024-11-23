import { useMemo } from "react";
import Component from "./components/bill-of-lading";
import "./App.css";
import { client, useConfig, useElementData, useElementColumns } from "@sigmacomputing/plugin";

client.config.configureEditorPanel([
  { name: "bol", type: "element" },
  { name: "shipDate", type: "column", source: "bol", allowMultiple: false },
  { name: "bolNumber", type: "column", source: "bol", allowMultiple: false },
  { name: "shipFromName", type: "column", source: "bol", allowMultiple: false },
  { name: "shipFromAdditionalName", type: "column", source: "bol", allowMultiple: false },
  { name: "shipFromAddress", type: "column", source: "bol", allowMultiple: false },
  { name: "shipFromCityStateZip", type: "column", source: "bol", allowMultiple: false },
  { name: "shipFromSid", type: "column", source: "bol", allowMultiple: false },
  { name: "shipFromSn", type: "column", source: "bol", allowMultiple: false },
  { name: "shipFromFob", type: "column", source: "bol", allowMultiple: false },
  { name: "shipToName", type: "column", source: "bol", allowMultiple: false },
  { name: "shipToAdditionalName", type: "column", source: "bol", allowMultiple: false },
  { name: "shipToAddress", type: "column", source: "bol", allowMultiple: false },
  { name: "shipToCityStateZip", type: "column", source: "bol", allowMultiple: false },
  { name: "shipToCid", type: "column", source: "bol", allowMultiple: false },
  { name: "shipToFob", type: "column", source: "bol", allowMultiple: false },
  { name: "thirdPartyName", type: "column", source: "bol", allowMultiple: false },
  { name: "thirdPartyAddress", type: "column", source: "bol", allowMultiple: false },
  { name: "thirdPartyCityStateZip", type: "column", source: "bol", allowMultiple: false },
  { name: "carrierName", type: "column", source: "bol", allowMultiple: false },
  { name: "carrierTrailerNumber", type: "column", source: "bol", allowMultiple: false },
  { name: "carrierSealNumbers", type: "column", source: "bol", allowMultiple: false },
  { name: "carrierScac", type: "column", source: "bol", allowMultiple: false },
  { name: "carrierProNumber", type: "column", source: "bol", allowMultiple: false },
  { name: "freightChargePrepaid", type: "column", source: "bol", allowMultiple: false },
  { name: "freightChargeCollect", type: "column", source: "bol", allowMultiple: false },
  { name: "freightChargeThirdParty", type: "column", source: "bol", allowMultiple: false },
  { name: "freightChargeMasterBol", type: "column", source: "bol", allowMultiple: false },
  { name: "warehouseInstructions", type: "column", source: "bol", allowMultiple: false },
  { name: "attnCarrier", type: "column", source: "bol", allowMultiple: false },
  { name: "chepAccount", type: "column", source: "bol", allowMultiple: false },
  { name: "sccOrder", type: "column", source: "bol", allowMultiple: false },
  { name: "codAmount", type: "column", source: "bol", allowMultiple: false },
  { name: "feeTermsCollect", type: "column", source: "bol", allowMultiple: false },
  { name: "feeTermsPrepaid", type: "column", source: "bol", allowMultiple: false },
  { name: "customerCheckAcceptable", type: "column", source: "bol", allowMultiple: false },
  { name: "trailerLoadedBy", type: "column", source: "bol", allowMultiple: false }, // Added
  { name: "freightCountedBy", type: "column", source: "bol", allowMultiple: false }, // Added
  { name: "carrier", type: "element" },
  { name: "handlingUnit_qty", type: "column", source: "carrier", allowMultiple: false },
  { name: "handlingUnit_type", type: "column", source: "carrier", allowMultiple: false },
  { name: "package_qty", type: "column", source: "carrier", allowMultiple: false },
  { name: "package_type", type: "column", source: "carrier", allowMultiple: false },
  { name: "weight", type: "column", source: "carrier", allowMultiple: false },
  { name: "hazmatX", type: "column", source: "carrier", allowMultiple: false },
  { name: "description", type: "column", source: "carrier", allowMultiple: false },
  { name: "nmfcNumber", type: "column", source: "carrier", allowMultiple: false },
  { name: "class", type: "column", source: "carrier", allowMultiple: false },
  { name: "customer", type: "element" },
  { name: "customerOrderNumber", type: "column", source: "customer", allowMultiple: false },
  { name: "customerOrderPackages", type: "column", source: "customer", allowMultiple: false },
  { name: "customerOrderWeight", type: "column", source: "customer", allowMultiple: false },
  { name: "customerOrderPalletSlip", type: "column", source: "customer", allowMultiple: false },
  { name: "customerOrderAdditionalInfo", type: "column", source: "customer", allowMultiple: false },
]);

function App() {
  const config = useConfig();
  const bolData = useElementData(config.bol);
  const bolColumns = useElementColumns(config.bol);
  const carrierData = useElementData(config.carrier);
  const carrierColumns = useElementColumns(config.carrier);
  const customerData = useElementData(config.customer);
  const customerColumns = useElementColumns(config.customer);

  // Define fields by source
  const fields = {
    bol: [
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
      "codAmount",
      "feeTermsCollect",
      "feeTermsPrepaid",
      "customerCheckAcceptable",
      "trailerLoadedBy", // Added
      "freightCountedBy", // Added
    ] as const,
    carrier: [
      "handlingUnit_qty",
      "handlingUnit_type",
      "package_qty",
      "package_type",
      "weight",
      "hazmatX",
      "description",
      "nmfcNumber",
      "class",
    ] as const,
    customer: [
      "customerOrderNumber",
      "customerOrderPackages",
      "customerOrderWeight",
      "customerOrderPalletSlip",
      "customerOrderAdditionalInfo",
    ] as const,
  };

  // Get field values for a specific source
  const getFieldValues = (source: 'bol' | 'carrier' | 'customer', data: any, columns: any) => {
    const getFieldValue = (fieldName: string) => {
      const fieldId = Object.keys(columns).find((key) => columns[key].name === fieldName);
      if (fieldId && data[fieldId]) {
        return data[fieldId][0] || "";
      }
      return "";
    };

    return fields[source].reduce((acc, field) => {
      acc[field] = getFieldValue(field);
      return acc;
    }, {} as Record<string, string>);
  };

  // Get field values for all sources
  const fieldValues = useMemo(() => ({
    bol: getFieldValues('bol', bolData, bolColumns),
    carrier: getFieldValues('carrier', carrierData, carrierColumns),
    customer: getFieldValues('customer', customerData, customerColumns),
  }), [bolData, bolColumns, carrierData, carrierColumns, customerData, customerColumns]);

  // Transform carrier data into the required format
  const transformedCarrierDetails = useMemo(() => {
    if (!carrierData || Object.keys(carrierData).length === 0) return [];
  
    const firstColumnId = Object.keys(carrierData)[0];
    const numRows = carrierData[firstColumnId]?.length || 0;
  
    return Array.from({ length: numRows }, (_, rowIndex) => {
      const getColumnValue = (fieldName: string) => {
        const columnId = Object.keys(carrierColumns).find(
          (key) => carrierColumns[key].name === fieldName
        );
        return columnId ? carrierData[columnId]?.[rowIndex] : null;
      };
  
      return {
        handlingUnit: {
          qty: Number(getColumnValue('handlingUnit_qty')) || 0,
          type: getColumnValue('handlingUnit_type') || '',
        },
        package: {
          qty: Number(getColumnValue('package_qty')) || 0,
          type: getColumnValue('package_type') || '',
        },
        weight: Math.round(Number(getColumnValue('weight')) || 0),  // Round weight to whole number
        hazmatX: Boolean(getColumnValue('hazmatX')),
        description: getColumnValue('description') || '',
        nmfcNumber: getColumnValue('nmfcNumber') || '',
        class: getColumnValue('class') || '',
      };
    });
  }, [carrierData, carrierColumns]);

  console.log("carrier details transformed: ");
  console.log(transformedCarrierDetails);
  // Transform customer data into the required format
  const transformedCustomerOrders = useMemo(() => {
    if (!customerData || Object.keys(customerData).length === 0) return [];
  
    const firstColumnId = Object.keys(customerData)[0];
    const numRows = customerData[firstColumnId]?.length || 0;
  
    return Array.from({ length: numRows }, (_, rowIndex) => {
      const getColumnValue = (fieldName: string) => {
        const columnId = Object.keys(customerColumns).find(
          (key) => customerColumns[key].name === fieldName
        );
        return columnId ? customerData[columnId]?.[rowIndex] : null;
      };
  
      return {
        orderNumber: getColumnValue('customerOrderNumber') || '',
        packages: Math.round(Number(getColumnValue('customerOrderPackages')) || 0),  // Round packages to whole number
        weight: Math.round(Number(getColumnValue('customerOrderWeight')) || 0),  // Round weight to whole number
        palletSlip: getColumnValue('customerOrderPalletSlip') || '',
        additionalInfo: getColumnValue('customerOrderAdditionalInfo') || '',
      };
    });
  }, [customerData, customerColumns]);
  

  return (
    <Component
      shipDate={fieldValues.bol.shipDate}
      bolNumber={fieldValues.bol.bolNumber}
      shipFrom={{
        name: fieldValues.bol.shipFromName,
        additionalName: fieldValues.bol.shipFromAdditionalName,
        address: fieldValues.bol.shipFromAddress,
        cityStateZip: fieldValues.bol.shipFromCityStateZip,
        sid: fieldValues.bol.shipFromSid,
        sn: fieldValues.bol.shipFromSn,
        fob: Boolean(fieldValues.bol.shipFromFob),
      }}
      shipTo={{
        name: fieldValues.bol.shipToName,
        additionalName: fieldValues.bol.shipToAdditionalName,
        address: fieldValues.bol.shipToAddress,
        cityStateZip: fieldValues.bol.shipToCityStateZip,
        cid: fieldValues.bol.shipToCid,
        fob: Boolean(fieldValues.bol.shipToFob),
      }}
      thirdParty={{
        name: fieldValues.bol.thirdPartyName,
        address: fieldValues.bol.thirdPartyAddress,
        cityStateZip: fieldValues.bol.thirdPartyCityStateZip,
      }}
      carrier={{
        name: fieldValues.bol.carrierName,
        trailerNumber: fieldValues.bol.carrierTrailerNumber,
        sealNumbers: fieldValues.bol.carrierSealNumbers,
        scac: fieldValues.bol.carrierScac,
        proNumber: fieldValues.bol.carrierProNumber,
      }}
      freightChargeTerms={{
        prepaid: Boolean(fieldValues.bol.freightChargePrepaid),
        collect: Boolean(fieldValues.bol.freightChargeCollect),
        thirdParty: Boolean(fieldValues.bol.freightChargeThirdParty),
        masterBol: Boolean(fieldValues.bol.freightChargeMasterBol),
      }}
      specialInstructions={{
        warehouseInstructions: fieldValues.bol.warehouseInstructions,
        attnCarrier: fieldValues.bol.attnCarrier,
        chepAccount: fieldValues.bol.chepAccount,
        sccOrder: fieldValues.bol.sccOrder,
      }}
      customerOrders={transformedCustomerOrders}
      carrierDetails={transformedCarrierDetails}
      codAmount={Number(fieldValues.bol.codAmount)}
      feeTermsCollect={Boolean(fieldValues.bol.feeTermsCollect)}
      feeTermsPrepaid={Boolean(fieldValues.bol.feeTermsPrepaid)}
      customerCheckAcceptable={Boolean(fieldValues.bol.customerCheckAcceptable)}
      trailerLoadedBy={fieldValues.bol.trailerLoadedBy}
      freightCountedBy={fieldValues.bol.freightCountedBy}
    />
  );
}

export default App;