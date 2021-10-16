import http from "k6/http";
import { check, sleep } from "k6";
import { getRandomVM } from "./vms.js";

export let options = {
  stages: [
    { duration: "20s", target: 500 },
    { duration: "20s", target: 500 },
    { duration: "20s", target: 0 },
  ],
};

export default function () {
  for (let i = 0; i < 3; i++) {
    const id = getRandomVM();
    let res = http.get(`http://localhost:8080/api/v1/attack?vm_id=${id}`);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });

    sleep(0.1);
  }

  let res = http.get("http://localhost:8080/api/v1/stats");
  check(res, {
    "is status 200": (r) => r.status === 200,
  });

  sleep(1);
}
