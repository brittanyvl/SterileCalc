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
