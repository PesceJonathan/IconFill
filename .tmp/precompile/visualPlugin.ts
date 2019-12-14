declare var powerbi;
powerbi.visuals = powerbi.visuals || {};
powerbi.visuals.plugins = powerbi.visuals.plugins || {};
powerbi.visuals.plugins["iconFiller316E184D50974591813CF51F3E87A0DDS_DEBUG"] = {
    name: 'iconFiller316E184D50974591813CF51F3E87A0DDS_DEBUG',
    displayName: 'Icon Filler',
    class: 'Visual',
    version: '2.0.0',
    apiVersion: '2.5.0',
    create: (options: extensibility.visual.VisualConstructorOptions) => new powerbi.extensibility.visual.Visual(options),
    custom: true
}
