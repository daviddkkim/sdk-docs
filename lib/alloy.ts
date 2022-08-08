import alloy from '@alloyidentity/web-sdk';


const alloyInitParams = {
    key: 'some_key',
    journeyApplicationToken: '',
    journeyToken: "some_token",
    documents: ['license', 'passport'],
    selfie: true,
    evaluationData: {
        nameFirst: 'John',
        nameLast: 'Beta',
        addressLine1: 'Address Line 1. C - left door',
        addressLine2: 'Secondary address. 2ºB',
        addressCity: 'City address',
        addressState: 'TX',
        addressPostalCode: '+419550',
        addressCountryCode: 'VI',
        birthDate: '2020-03-03',
    },
    color: {}
    // forceMobile: true
};
export function initAlloy(color: { primary: string, secondary: string }) {
    alloyInitParams.color = color;
    alloy.init(alloyInitParams)
}

export function closeAlloy() {
    alloy.close();
}

export function openAlloy(cb: any, anchorElement: any) {
    alloy.open(cb, anchorElement);
}

export function getJourneyToken() {
    return alloyInitParams.journeyToken;
}