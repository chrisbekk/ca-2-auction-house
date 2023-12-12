export function queryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get(name));
  return urlParams.get(name);
}
