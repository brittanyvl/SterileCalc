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
    document.getElementById(element).innerHTML = "If the patient requires a dose of " + userDoseNum + doseUnit + ", and the drug product contains " + userStrengthNum + strengthUnit + " per every " + userStrengthVolNum + "mL, they would need to inject " + result[0] + "mL or " + result[1] + " units.";

}

/* Doses per Unit Functions 
function dosesperunit() {
    let calcDoseNum, calcStrengthNum, maxPerVial;
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


    // Check if any required fields are blank, if yes, alert and return error.
    if (isNaN(per28Days) || isNaN(perDoseNum) || isNaN(perStrengthNum) || isNaN(perStrengthVol) || isNaN(perVialVol) || isNaN(perQuantity)) {
        alert("You are missing a required value; please complete all fields and try again.");
        document.getElementById("contentResult").innerHTML = "Error";
        return; // Exit the function early if there's an error
    }

    //Convert doseNum and strengthNum to mg if needed
    if (perDoseUnit === 'mg') {
        calcDoseNum = perDoseNum
    }
    if (perStrengthUnit === 'mg') {
        calcStrengthNum = perStrengthNum
    }
    if (perDoseUnit === 'mcg') {
        calcDoseNum = perDoseNum / 1000
    }
    if (perDoseUnit === 'g') {
        calcDoseNum = perDoseNum * 1000
    }
    if (perStrengthUnit === 'mg') {
        calcStrengthNum = perStrengthNum
    }
    if (perStrengthUnit === 'mcg') {
        calcStrengthNum = perStrengthNum / 1000
    }
    if (perStrengthUnit === 'g') {
        calcStrengthNum = perStrengthNum * 1000
    }

    // Calculate total drug content in the UOM
    const totalcontentpervial = ((perStrengthNum * perVialVol) / perStrengthVol);
    const totalcontent = totalcontentpervial * perQuantity;

    // Calculate Max Possible Doses & per patient max & max per vial 
    maxPerVial = totalcontentpervial / calcDoseNum;
    const maxpossible = totalcontent / calcDoseNum;
    let patientMax, patientVialMax;

    if (per28Days < maxpossible) {
        patientMax = per28Days;
    } else {
        patientMax = maxpossible;
    }

    patientMax *= perQuantity;

    if (per28Days < totalcontentpervial) {
        patientVialMax = per28Days;
    } else {
        patientVialMax = maxpossible;
    }


    //Calculate Final Results basedon Pharmacy Type & Preservative Status 
    if (perLicense != '503A') {
        if (perPFStatus === 'pf') {
            document.getElementById("perResult").innerHTML = `There are ${maxpossible} possible doses but note that unpreserved products must be disposed 4 hours after opening. This could result in signifcant waste, lowering this number.`;

        }
        else {
            document.getElementById("perResult").innerHTML = `There are ${maxpossible} possible doses but note that preserved vials must be discarded 28 days after their first puncture. Any unused product must be wasted.`;
        }
    }
    else {
        if (perPFStatus === 'pf') {
            document.getElementById("perResult").innerHTML = `There is only (1) dose available per vial, for a total of ${patientMax} doses across all ${perQuantity} vials assuming you can complete that many doses before the product
            s posted Best Use Date. Please note that you must dispose of any unused product 4 hours after the first puncture because each individual vial is preservative free.`;
        }
        else {
            document.getElementById("perResult").innerHTML = `There are ${patientVialMax} available doses in each vial for a total of ${patientMax} doses in the UOM.  Remember, each preserved vial must be disposed within 28 days of the first puncture.`;
        }
    }
}*/


function dosesPerUnit(perDoseNum, perDoseUnit, per28Days, per28Days, perStrengthNum, perStrengthVol, perStrengthUnit, perVialVol, perQuantity, perPFStatus, perLicense) {
    let calcDoseNum, calcStrengthNum, maxPerVial;

    // Check if any required fields are blank, if yes, alert and return error.
    if (isNaN(per28Days) || isNaN(perDoseNum) || isNaN(perStrengthNum) || isNaN(perStrengthVol) || isNaN(perVialVol) || isNaN(perQuantity)) {
        alert("You are missing a required value; please complete all fields and try again.");
        document.getElementById("contentResult").innerHTML = "Error";
        return; // Exit the function early if there's an error
    }

    //Convert doseNum and strengthNum to mg if needed
    if (perDoseUnit === 'mg') {
        calcDoseNum = perDoseNum
    }
    if (perStrengthUnit === 'mg') {
        calcStrengthNum = perStrengthNum
    }
    if (perDoseUnit === 'mcg') {
        calcDoseNum = perDoseNum / 1000
    }
    if (perDoseUnit === 'g') {
        calcDoseNum = perDoseNum * 1000
    }
    if (perStrengthUnit === 'mg') {
        calcStrengthNum = perStrengthNum
    }
    if (perStrengthUnit === 'mcg') {
        calcStrengthNum = perStrengthNum / 1000
    }
    if (perStrengthUnit === 'g') {
        calcStrengthNum = perStrengthNum * 1000
    }

    // Calculate total drug content in the UOM
    const totalcontentpervial = ((perStrengthNum * perVialVol) / perStrengthVol);
    const totalcontent = totalcontentpervial * perQuantity;

    // Calculate Max Possible Doses & per patient max & max per vial 
    maxPerVial = totalcontentpervial / calcDoseNum;
    const maxpossible = totalcontent / calcDoseNum;
    let patientMax, patientVialMax;

    if (per28Days < maxpossible) {
        patientMax = per28Days;
    } else {
        patientMax = maxpossible;
    }

    patientMax *= perQuantity;

    if (per28Days < totalcontentpervial) {
        patientVialMax = per28Days;
    } else {
        patientVialMax = maxpossible;
    }


    //Calculate Final Results basedon Pharmacy Type & Preservative Status 
    if (perLicense != '503A') {
        if (perPFStatus === 'pf') {
            resultString = `There are ${maxpossible} possible doses but note that unpreserved products must be disposed 4 hours after opening. This could result in signifcant waste, lowering this number.`;

        }
        else {
            resultString = `There are ${maxpossible} possible doses but note that preserved vials must be discarded 28 days after their first puncture. Any unused product must be wasted.`;
        }
    }
    else {
        patientMax = 1
        if (perPFStatus === 'pf') {
            resultString = `There is only (1) dose available per vial, for a total of ${patientMax} doses across all ${perQuantity} vials assuming you can complete that many doses before the product
            s posted Best Use Date. Please note that you must dispose of any unused product 4 hours after the first puncture because each individual vial is preservative free.`;
        }
        else {
            resultString = `There are ${patientVialMax} available doses in each vial for a total of ${patientMax} doses in the UOM.  Remember, each preserved vial must be disposed within 28 days of the first puncture.`;
        }
    }
    return [resultString, maxpossible, patientVialMax, patientMax]
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
    resultString = dosesPerUnit(perDoseNum, perDoseUnit, per28Days, per28Days, perStrengthNum, perStrengthVol, perStrengthUnit, perVialVol, perQuantity, perPFStatus, perLicense);
    document.getElementById("perResult").innerHTML = resultString[0];
}

