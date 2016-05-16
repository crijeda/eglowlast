// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "twitter"
});
ServiceConfiguration.configurations.insert({
  service: "twitter",
  consumerKey: "zkDgvqtBLiaui3NoaGxsjdu8V",
  loginStyle: "popup",
  secret: "J54WG3UJxZWcYD1ks3cxTaOIHKwLPVOyVVLMt1L0KgPoWAutSt"
});