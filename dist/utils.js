"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math = require("mathjs");
const models_1 = require("./models");
function convertUnits(name, value, unit) {
    const convertedQuantity = math
        .unit(value, unit)
        .toSI()
        .toString();
    const convertedUnit = convertedQuantity.substring(convertedQuantity.indexOf(' ') + 1);
    const convertedValue = convertedQuantity.substring(0, convertedQuantity.indexOf(' '));
    const floatConverted = parseFloat(convertedValue);
    // add logic for wavlength in units of energy
    if (name === 'wavelength' && convertedUnit === 'J') {
        // if units are in energy
        // convert to joules than length
        const planckConstant = 6.62607015e-34;
        const speedOfLight = 2.99792458e8;
        const lambda = (planckConstant * speedOfLight) / floatConverted;
        return lambda;
    }
    return floatConverted;
}
exports.convertUnits = convertUnits;
function convertNameforScicat(panoscName, type) {
    switch (type) {
        case 'number':
        case 'string': {
            return 'scientificMetadata.' + panoscName + '.value';
        }
        case 'quantity': {
            return 'scientificMetadata.' + panoscName + '.valueSI';
        }
        default: {
            return 'scientificMetadata.' + panoscName + '.value';
        }
    }
}
exports.convertNameforScicat = convertNameforScicat;
function convertQueryForSciCat(filter) {
    const scicatQuery = {};
    if (filter !== undefined && typeof filter !== undefined) {
        if ('include' in filter) {
            const include = filter['include'];
            if (include !== undefined && typeof include !== undefined) {
                scicatQuery['include'] = filter['include'];
            }
            else {
                scicatQuery['include'] = { relation: 'origdatablocks' };
            }
        }
        else {
            // scicatQuery['include'] = [ "samples", "instrument"]
        }
        if ('limit' in filter) {
            const limit = filter['limit'];
            if (limit !== undefined && typeof limit !== undefined) {
                scicatQuery['limit'] = limit;
            }
        }
        if ('skip' in filter) {
            const skip = filter['skip'];
            if (skip !== undefined && typeof skip !== undefined) {
                scicatQuery['skip'] = skip;
            }
            else {
                scicatQuery['skip'] = 0;
            }
        }
        const where = filter.where;
        if (where !== undefined && typeof where !== undefined) {
            if ('and' in where) {
                const parameterSearchArray = [];
                where.and.forEach((element) => {
                    const query1 = element;
                    console.log(query1);
                    let andElement;
                    if (isNaN(Number(query1.value))) {
                        const convertedName = convertNameforScicat(query1.variable, 'string');
                        andElement = {
                            [convertedName]: {
                                [query1.operator]: query1.value,
                            },
                        };
                    }
                    else {
                        let value;
                        let convertedName;
                        if (query1.unit.length > 0) {
                            value = convertUnits(query1.variable, query1.value, query1.unit);
                            convertedName = convertNameforScicat(query1.variable, 'quantity');
                        }
                        else {
                            value = query1.value;
                            convertedName = convertNameforScicat(query1.variable, 'number');
                        }
                        andElement = {
                            [convertedName]: {
                                [query1.operator]: value,
                            },
                        };
                    }
                    parameterSearchArray.push(andElement);
                });
                scicatQuery['where'] = { and: parameterSearchArray };
            }
            else if ('or' in where) {
                const parameterSearchArray = [];
                where.or.forEach((element) => {
                    const query1 = element;
                    console.log(query1);
                    let orElement;
                    if (isNaN(Number(query1.value))) {
                        const convertedName = convertNameforScicat(query1.variable, 'string');
                        orElement = {
                            [convertedName]: {
                                [query1.operator]: query1.value,
                            },
                        };
                    }
                    else {
                        let value;
                        let convertedName;
                        if (query1.unit.length > 0) {
                            value = convertUnits(query1.variable, query1.value, query1.unit);
                            convertedName = convertNameforScicat(query1.variable, 'quantity');
                        }
                        else {
                            value = query1.value;
                            convertedName = convertNameforScicat(query1.variable, 'number');
                        }
                        orElement = {
                            [convertedName]: {
                                [query1.operator]: value,
                            },
                        };
                    }
                    parameterSearchArray.push(orElement);
                });
                scicatQuery['where'] = { or: parameterSearchArray };
            }
            else if ('query' in where) {
                const query2 = where.query;
                let condition;
                if (isNaN(Number(query2.value))) {
                    const convertedName = convertNameforScicat(query2.variable, 'string');
                    condition = {
                        [convertedName]: {
                            [query2.operator]: query2.value,
                        },
                    };
                }
                else {
                    let value;
                    let convertedName;
                    if (query2.unit.length > 0) {
                        value = convertUnits(query2.variable, query2.value, query2.unit);
                        convertedName = convertNameforScicat(query2.variable, 'quantity');
                    }
                    else {
                        value = query2.value;
                        convertedName = convertNameforScicat(query2.variable, 'number');
                    }
                    condition = {
                        [convertedName]: {
                            [query2.operator]: value,
                        },
                    };
                }
                scicatQuery['where'] = condition;
            }
            else {
                const scicatWhere = mapPanPropertiesToScicatProperties(where);
                scicatQuery['where'] = scicatWhere;
            }
        }
    }
    const jsonString = JSON.stringify(scicatQuery);
    console.log(jsonString);
    const jsonLimits = encodeURIComponent(jsonString);
    return jsonLimits;
}
exports.convertQueryForSciCat = convertQueryForSciCat;
function mapPanPropertiesToScicatProperties(where) {
    const scicatWhere = {};
    const scicatEquivalent = {
        pid: 'doi',
        title: 'datasetName',
        'techniques.name': 'techniques.name',
    };
    Object.keys(where).forEach(key => {
        console.log(key);
        const scicatKey = scicatEquivalent[key];
        console.log(scicatKey);
        const whereObject = where;
        scicatWhere[scicatKey] = whereObject[key];
        console.log(' value of key ', whereObject[key]);
        // "10.17199/165f8a52-c15d-4c96-ad7d-fb0cbe969f66"
    });
    return scicatWhere;
}
exports.mapPanPropertiesToScicatProperties = mapPanPropertiesToScicatProperties;
function idquery(pid) {
    const scicatQuery = { id: pid };
    const jsonString = JSON.stringify(scicatQuery);
    console.log(jsonString);
    const jsonLimits = encodeURIComponent(jsonString);
    return jsonLimits;
}
exports.idquery = idquery;
function convertDatasetToPaN(scicatDataset) {
    const panDataset = {
        pid: scicatDataset.pid,
        isPublic: true,
        title: scicatDataset.datasetName,
        creationDate: scicatDataset.creationTime,
        size: scicatDataset.size,
        score: 0,
    };
    const paramArray = [];
    if ('scientificMetadata' in scicatDataset) {
        Object.keys(scicatDataset.scientificMetadata).forEach((key) => {
            // console.log('key', key);
            const panParam = {
                name: key,
                value: scicatDataset.scientificMetadata[key]['value'],
                unit: scicatDataset.scientificMetadata[key]['unit'],
            };
            paramArray.push(panParam);
        });
        panDataset.parameters = paramArray;
    }
    // Samples
    const sampleArray = [];
    if ('samples' in scicatDataset) {
        scicatDataset.samples.forEach((value) => {
            console.log('sample', value);
            const panSample = {
                pid: value.sampleId,
                title: value.description,
            };
            sampleArray.push(panSample);
        });
    }
    panDataset.samples = sampleArray;
    // Techniques
    let techniqueArray = [];
    if ('techniques' in scicatDataset) {
        // console.log('techniques', scicatDataset['techniques']);
        techniqueArray = techniqueArray.concat(scicatDataset['techniques']);
    }
    panDataset.techniques = techniqueArray;
    // Instrument
    let instrument = {
        pid: '11',
        name: 'a',
        facility: 'ESS',
        score: 0,
    };
    if ('instrument' in scicatDataset) {
        console.log('instrument', scicatDataset['instrument']);
        instrument = scicatDataset['instrument'];
    }
    panDataset.instrument = instrument;
    // Size
    let size;
    if ('size' in scicatDataset) {
        size = scicatDataset['size'];
    }
    panDataset.size = size;
    return panDataset;
}
exports.convertDatasetToPaN = convertDatasetToPaN;
function getPaNFilesFromDataset(scicatDataset) {
    if (scicatDataset) {
        let panFiles = [];
        if (scicatDataset['origdatablocks']) {
            const files = scicatDataset['origdatablocks'].map(datablock => datablock.dataFileList.map(file => new models_1.File({
                id: datablock.id,
                name: file.path,
            })));
            panFiles = panFiles.concat(...files);
        }
        return panFiles;
    }
    else {
        return [];
    }
}
exports.getPaNFilesFromDataset = getPaNFilesFromDataset;
function convertSampleToPaN(scicatSample) {
    const panSample = {
        pid: scicatSample.sampleId,
        title: scicatSample.description,
    };
    const paramArray = [];
    if ('scientificMetadata' in scicatSample) {
        Object.keys(scicatSample.scientificMetadata).forEach((key) => {
            // console.log('key', key);
            const panParam = {
                name: key,
                value: scicatSample.scientificMetadata[key]['value'],
                unit: scicatSample.scientificMetadata[key]['unit'],
            };
            paramArray.push(panParam);
        });
        panSample.parameters = paramArray;
    }
    return panSample;
}
exports.convertSampleToPaN = convertSampleToPaN;
function convertDocumentToPaN(scicatPub) {
    const panDocument = {
        pid: scicatPub.doi,
        isPublic: true,
        title: scicatPub.title,
        summary: scicatPub.abstract,
        type: 'Publication',
        startDate: scicatPub.creationTime,
        endDate: scicatPub.creationTime,
        releaseDate: scicatPub.creationTime,
        license: 'CC-BY-4.0',
        score: 0,
    };
    const datasetArray = [];
    if ('datasets' in scicatPub) {
        console.log(scicatPub.datasets);
        scicatPub.datasets.forEach((value) => {
            console.log('sample', value);
            const panDataset = {
                pid: value.pid,
                title: value.datasetName,
                isPublic: true,
                creationDate: 'string',
                size: 0,
            };
            datasetArray.push(panDataset);
        });
    }
    panDocument.datasets = datasetArray;
    return panDocument;
}
exports.convertDocumentToPaN = convertDocumentToPaN;
function convertInstrumentToPaN(scicatInstrument) {
    const panInstrument = {
        pid: scicatInstrument.pid,
        name: scicatInstrument.name,
        facility: 'ESS',
        score: 0,
    };
    return panInstrument;
}
exports.convertInstrumentToPaN = convertInstrumentToPaN;
//# sourceMappingURL=utils.js.map