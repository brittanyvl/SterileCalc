function convertdose(userDoseNum, doseUnit, userStrengthNum, strengthUnit, userStrengthVolNum) {
    let calcDoseNum, calcStrengthNum;

    // Check if userDoseNum or userStrengthNum are NaN
    console.log(`userDoseNum is ${userDoseNum} => ${isNaN(userDoseNum)}`)
    console.log(`userStrengthNum is ${userStrengthNum} => ${isNaN(userStrengthNum)}`)
    if (isNaN(userDoseNum) || isNaN(userStrengthNum)) {
        alert("You are missing a value; please complete all fields and try again.");
        document.getElementById("convert_result").innerHTML = "Error";
        return; // Exit the function early if there's an error
    }

    // Convert Units all units to mg
    if (doseUnit === 'mg') {
        calcDoseNum = userDoseNum
    }
    if (strengthUnit === 'mg') {
        calcStrengthNum = userStrengthNum
    }
    if (doseUnit === 'mcg') {
        calcDoseNum = userDoseNum / 1000
    }
    if (doseUnit === 'g') {
        calcDoseNum = userDoseNum * 1000
    }
    if (strengthUnit === 'mg') {
        calcStrengthNum = userStrengthNum
    }
    if (strengthUnit === 'mcg') {
        calcStrengthNum = userStrengthNum / 1000
    }
    if (strengthUnit === 'g') {
        calcStrengthNum = userStrengthNum * 1000
    }

    let result = (calcDoseNum / calcStrengthNum) * userStrengthVolNum;
    let resultunits = result * 100;
    return [result, resultunits];
}

function printInjectionVol(element) {
    const userDoseNum = parseFloat(document.getElementById('convert_doseNum').value);
    const doseUnit = document.getElementById('convert_doseUnit').value;
    const userStrengthNum = parseInt(document.getElementById('convert_strengthNum').value);
    const strengthUnit = document.getElementById('convert_strengthUnit').value;
    const userStrengthVolNum = parseFloat(document.getElementById('convert_strengthVolNum').value);
    const result = convertdose(userDoseNum, doseUnit, userStrengthNum, strengthUnit, userStrengthVolNum);
    document.getElementById(element).innerHTML =
        "If the patient requires a dose of " + userDoseNum + doseUnit + ", and the drug product contains " + userStrengthNum + strengthUnit + " per every " + userStrengthVolNum + "mL, they would need to inject " + result[0] + "mL or " + result[1] + " units.";

}

function getTotalDrugContent(drugStrengthNum, drugStrengthUnit, drugStrengthVol, drugVialVol, perQuantity) {
    let totalVialContent, totalUnitContent;

    totalVialContent = ((drugStrengthNum * drugVialVol) / drugStrengthVol);
    totalUnitContent = totalVialContent * perQuantity;
    resultString = `There are ${totalVialContent}${drugStrengthUnit} in each vial and ${totalUnitContent}${drugStrengthUnit} total in the purchasable unit.`
    return [resultString, totalVialContent, totalUnitContent, drugStrengthUnit]
}

function getDosesPerUnit(perDoseNum, perDoseUnit, per28Days, perStrengthNum, perStrengthVol, perStrengthUnit, perVialVol, perQuantity, perPFStatus, perLicense) {
    let calcDoseNum, calcStrengthNum, maxPossibleDoses, maxPerVialDoses;

    // Check if any required fields are blank, if yes, alert and return error.
    if (isNaN(per28Days) || isNaN(perDoseNum) || isNaN(perStrengthNum) || isNaN(perStrengthVol) || isNaN(perVialVol) || isNaN(perQuantity)) {
        alert("You are missing a required value; please complete all fields and try again.");
        document.getElementById("perResult").innerHTML = "Error";
        return;
    }

    //Convert doseNum and strengthNum to mg if needed
    if (perDoseUnit === 'mg') {
        calcDoseNum = perDoseNum;
    }
    if (perStrengthUnit === 'mg') {
        calcStrengthNum = perStrengthNum;
    }
    if (perDoseUnit === 'mcg') {
        calcDoseNum = perDoseNum / 1000;
    }
    if (perDoseUnit === 'g') {
        calcDoseNum = perDoseNum * 1000;
    }
    if (perStrengthUnit === 'mg') {
        calcStrengthNum = perStrengthNum;
    }
    if (perStrengthUnit === 'mcg') {
        calcStrengthNum = perStrengthNum / 1000;
    }
    if (perStrengthUnit === 'g') {
        calcStrengthNum = perStrengthNum * 1000;
    }

    totalContentDetails = getTotalDrugContent(calcStrengthNum, perStrengthUnit, perStrengthVol, perVialVol, perQuantity)

    totalVialContent = totalContentDetails[1]
    totalUnitContent = totalContentDetails[2]

    maxPossibleDoses = totalUnitContent / calcDoseNum;
    maxPerVialDoses = totalVialContent / calcDoseNum;

    //fix for 503A
    if (perLicense === '503A') {
        if (per28Days < maxPossibleDoses) {
            maxPossibleDoses = per28Days;
        }
        if (per28Days < maxPerVialDoses) {
            maxPerVialDoses = per28Days;
        }
        if (perPFStatus === 'pf') {
            maxPerVialDoses = 1;
            maxPossibleDoses = perQuantity;
        }
    }

    if (perLicense != '503A') { //Bulk Order
        if (perPFStatus === 'pf') {
            resultString = `There are ${maxPossibleDoses} potential ${perDoseNum}${perDoseUnit} doses in the described unit. You indicated that the product is preservative free, so remembeer that USP 797 guidelines require disposal 4 hours after first accessing the vial, or once the BUD has been reached, whichever occurs first.`
        }
        else { // is preserved
            resultString = `There are ${maxPossibleDoses} potential ${perDoseNum}${perDoseUnit} doses in the described unit. You indicated that the product is preserved, so remembeer that USP 797 guidelines require disposal 28 days after first accessing the vial, or once the BUD has been reached, whichever occurs first.`
        }

    }
    else { //if it is 503A
        if (perPFStatus === 'pf') {
            resultString = `When using a preservative free, patient specific vial, you will only have 1 available dose per vial. Based on the indicated ${perQuantity} vials, you would have ${maxPossibleDoses} available dose(s) as long as the product was used before the labeled Best Use Date (BUD).`
        }
        else { //503A and preserved
            resultString = `There are ${maxPerVialDoses} potential ${perDoseNum}${perDoseUnit} doses in each described vial and ${maxPossibleDoses} potential doses in the unit.  While there may be more product in the vial, you have indicated this is a patient specific purchase.  The possible doses per unit provided will honor the (28) day puncture rule per the USP 797 guidelines as well as limiting the vial to a single patient, honoring the maximum 28 day dosage provided.`
        }

    }
    return [resultString, maxPerVialDoses, maxPossibleDoses]
}
function printDosesPerUnit(element) {
    const perDoseNum = parseInt(document.getElementById('perDoseNum').value);
    const perDoseUnit = document.getElementById('perDoseUnit').value;
    const per28Days = parseInt(document.getElementById('per28Days').value);
    const perStrengthNum = parseInt(document.getElementById('perStrengthNum').value);
    const perStrengthVol = parseFloat(document.getElementById('perStrengthVol').value);
    const perStrengthUnit = document.getElementById('perStrengthUnit').value;
    const perVialVol = parseInt(document.getElementById('perVialVol').value);
    const perQuantity = parseInt(document.getElementById('perQuantity').value);
    const perPFStatus = document.getElementById('perPFStatus').value;
    const perLicense = document.getElementById('perLicense').value;
    const resultString = getDosesPerUnit(perDoseNum, perDoseUnit, per28Days, perStrengthNum, perStrengthVol, perStrengthUnit, perVialVol, perQuantity, perPFStatus, perLicense);
    document.getElementById("perResult").innerHTML = resultString[0];
}

function getCostPerDose(costCost, costDoseNum, costDoseUnit, cost28Days, costStrengthNum, costStrengthVol, costStrengthUnit, costVialVol, costQuantity, costPFStatus, costLicense) {
    const dosesPerUnit = getDosesPerUnit(costDoseNum, costDoseUnit, cost28Days, costStrengthNum, costStrengthVol, costStrengthUnit, costVialVol, costQuantity, costPFStatus, costLicense);
    possibleDoses = dosesPerUnit[2];
    let finalCost = costCost / possibleDoses;
    finalCost = parseFloat(finalCost.toFixed(2));
    resultString = `The cost per dose is $${finalCost} assuming you use all allowed product prior to the Best Use Date. The provided cost does honor USP 797 guidelines on vial access rules and 503A rules around patient specific restrictions, when indicated on your form submission.`;
    return [resultString, finalCost];
}

function printCostPerDose() {
    const costDoseNum = parseInt(document.getElementById('costDoseNum').value);
    const costDoseUnit = document.getElementById('costDoseUnit').value;
    const cost28Days = parseInt(document.getElementById('cost28Days').value);
    const costStrengthNum = parseInt(document.getElementById('costStrengthNum').value);
    const costStrengthVol = parseFloat(document.getElementById('costStrengthVol').value);
    const costStrengthUnit = document.getElementById('costStrengthUnit').value;
    const costVialVol = parseInt(document.getElementById('costVialVol').value);
    const costQuantity = parseInt(document.getElementById('costQuantity').value);
    const costPFStatus = document.getElementById('costPFStatus').value;
    const costLicense = document.getElementById('costLicense').value;
    const costCost = parseFloat(document.getElementById('costCost').value);
    const resultString = getCostPerDose(costCost, costDoseNum, costDoseUnit, cost28Days, costStrengthNum, costStrengthVol, costStrengthUnit, costVialVol, costQuantity, costPFStatus, costLicense);
    document.getElementById("costResult").innerHTML = resultString[0];
}
