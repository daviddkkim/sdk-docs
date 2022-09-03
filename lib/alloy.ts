import alloy, {Init} from "@alloyidentity/web-sdk";

/* curl --request POST --url 'https://docv-dev-api.alloy.co/v1/journeys/J-59H8fV7Ft6jI5AoMrrwi/applications' --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI4NjQ1NjAyLTk1NjAtNGMzMy1hZWM4LTJmNDEwNGY2ZTZhYyIsImRvbWFpbiI6Imh0dHBzOi8vZG9jdi1kZXYtYXBpLmFsbG95LmNvIiwibG9nb19sZWZ0IjoiaHR0cHM6Ly9hbGxveS16MS1tZWRpYS5zMy5hbWF6b25hd3MuY29tL2xvZ29zL0RvY3ZfVGVzdF9DbGllbnRfTUVKX2xvZ29fMS5wbmciLCJsb2dvX3JpZ2h0IjpudWxsLCJzbXNfdGV4dCI6bnVsbCwiaWF0IjoxNjYxNzMwNDA3LCJleHAiOjE2NjE4MTY4MDd9.Qn3t1RCq9ULY1Cn5v30-pkD-PqxP3Sg3dy4Vx6mi5bc' --header 'Content-Type: application/json' --header 'X-Alloy-Sdk-Platform: Web' --header 'X-Alloy-Sdk-Version: 1' --header 'X-Parent-Domain:https://localhost:3000' --data '{
        "do_await_additional_entities": false,
        "entities": [
                {
                        "entity_type": "person",
                        "branch_name": "persons2",
                        "name_first": "John",
                        "name_last": "Random6"
                },{
                        "entity_type": "person",
                        "branch_name": "persons2",
                        "name_first": "Mary",
                        "name_last": "Random6"
                }
        ]
}' */

const alloyInitParams = {
  key: 'b13ac409-fcbc-4e41-a60f-7e58d9f765e1',
  journeyToken: 'J-sinrLXpUWfu4NiUs0Izq',
  journeyApplicationToken: 'JA-A45Dr7qGI6XGFFl3pDPe',
  evaluationData: {
    nameFirst: 'John',
    nameLast: 'Random',
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
export function initAlloy(color: { primary: string; secondary: string, accent: string, text: string }) {
  alloyInitParams.color = color;
  alloy.init(alloyInitParams);
}

export function closeAlloy() {
  alloy.close();
}

export function openAlloy(cb: any, anchorElement?: any) {
  alloy.open(cb, anchorElement);
}

export function getJourneyToken() {
  return alloyInitParams.journeyToken;
}
