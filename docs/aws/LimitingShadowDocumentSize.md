# Limiting the Shadow Document Size

The nRF9160 has a size limit of 2303 bytes for sending and receiving TLS
packages (<small>FIXME: citation needed</small>). Bifravst sets up an IoT rule
which only publishes the `cfg` section of
[the shadow document](../firmware/state.json) to a separate topic
`$aws/things/<thing name>/shadow/get/accepted/desired/cfg` when devices receive
their state after publishing an empty message to
[`$aws/things/<thing name>/shadow/get`](https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html#get-pub-sub-topic).

The published object may be empty if the device has no shadow or the
configuration is not set:

    {}

Otherwise the message will contain one top-level key `cfg` and the desired
device configuration:

    {
      "cfg": {
        "gpst": 720,
        "celt": 600,
        "act": false,
        "actwt": 60,
        "mvres": 60,
        "mvt": 3600,
        "acct": 12
      }
    }
