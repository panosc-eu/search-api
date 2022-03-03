'use strict';

const http = require('https');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const INVENIO_IP = process.env['INVENIO_IP']

function getFileSize(value, propertyKey, data) {
  if (data.files.enabled) {
    return new Promise((resolve, reject) => {
      let req = http.request(
        {host: INVENIO_IP, port:5000, path:'/api/records/' + value + '/files'},
        (response) => {
          let result = '';
          response.on('data', (chunk) => {result += chunk;});
          response.on('end', () => {
            let entries = JSON.parse(result).entries;
            if (entries === undefined) {
              resolve(0);
            } else {
              let size = 0;
              for (let entry of entries) {
                size += entry.size;
              }
              resolve(size);
            }
          });
        }
      );
      req.on('error', error => {reject(error)});
      req.end();
    })
  } else {
    return 0;
  }
}

function getFileData(data) {
  return new Promise((resolve, reject) => {
    let fileData = data.map(async item => new Promise((itemResolve, itemReject) => {
      if (item.fields['files.enabled'][0]) {
        let itemId = item.fields['id'][0];
        let req = http.request(
          {host: INVENIO_IP, port: 5000, path: '/api/records/' + itemId + '/files'},
          (response) => {
            let result = '';
            response.on('data', (chunk) => {result += chunk;});
            response.on('end', () => {
              let entries = JSON.parse(result).entries;
              if (entries === undefined) {
                itemResolve(item);
              } else {
                item['fields'] = {
                  'metadata.resource_type.id': [],
                  'id': [],
                  'name': [],
                  'path': [],
                  'size': [],
                  'datasetId': [],
                }
                for (let entry of entries) {
                  item['fields']['metadata.resource_type.id'].push('dataset');
                  item['fields']['id'].push(itemId);
                  item['fields']['name'].push(entry.key);
                  item['fields']['path'].push(entry.links.self);
                  item['fields']['size'].push(entry.size);
                  item['fields']['datasetId'].push(itemId);
                }
                itemResolve(item);
              }
            });
          }
        );
        req.on('error', error => {itemReject(error)});
        req.end();
      } else {
        itemResolve(item);
      }
      })
    );
    Promise.all(fileData).then(function (results) {resolve(results);});
  })
}

function getInstruments(value, propertyKey, data){
  if (value !== undefined) {
    let filtered = value.filter(instrument => instrument.scheme === 'Instruments');
    return filtered.length > 0 ? filtered.length > 1 ? filtered.map(item => item['id']) : filtered[0]['id'] : '';
  } else {
    return '';
  }
}

module.exports = {
  "Dataset" : {"key": "metadata.resource_type.id:dataset*"},
  "Dataset.pid": {"key": "id"},
  "Dataset.title": {"key": "metadata.title"},
  "Dataset.isPublic": {"key": "access.record", "resultFormatter": (value, propertyKey, data) => value === 'public'},
  "Dataset.size": {"key": "id", "resultFormatter": getFileSize},
  "Dataset.creationDate": {"key": "created"},
  "Dataset.documentId": {"property": "pid", "model": "Document", "subrecord": "metadata.related_identifiers.identifier", "valueFormatter": (value, propertyKey, data) => "http*" + value, "resultFormatter": (value, propertyKey, data) => value === undefined ? '' : value},
  "Dataset.instrumentId": {"key": "metadata.subjects", "resultFormatter": getInstruments},
  "Dataset.score": {"resultFormatter": (value, propertyKey, data) => 0},

  "Document" : {"key": "metadata.resource_type.id:publication*"},
  "Document.pid": {"key": "id"},
  "Document.isPublic": {"key": "access.record", "resultFormatter": (value, propertyKey, data) => value === 'public'},
  "Document.type": {"key": "metadata.resource_type.id"},
  "Document.title": {"key": "metadata.title"},
  "Document.summary": {"key": "metadata.description", "resultFormatter": (value, propertyKey, data) => value === undefined ? '' : value},
  "Document.doi": {"resultFormatter": (value, propertyKey, data) => ''},
  "Document.startDate": {"key": "created"},
  "Document.endDate": {"key": "updated"},
  "Document.releaseDate": {"key": "metadata.publication_date"},
  "Document.license": {"key": "metadata.rights.0.title.en", "resultFormatter": (value, propertyKey, data) => value === undefined ? '' : value},
  "Document.keywords": {"resultFormatter": (value, propertyKey, data) => []},
  "Document.score": {"resultFormatter": (value, propertyKey, data) => 0},

  "Instrument" : {"key": "metadata.subjects.scheme:Instruments", 'multiple': true, 'fields': ['metadata.subjects.*']},
  "Instrument.pid": {"key": "metadata.subjects.id"},
  "Instrument.name": {"key": "metadata.subjects.subject"},
  "Instrument.facility": {"resultFormatter": (value, propertyKey, data) => 'ELI-ALPS'},
  "Instrument.score": {"resultFormatter": (value, propertyKey, data) => 0},

  "Technique" : {"key": "metadata.subjects.scheme:Techniques", 'multiple': true, 'fields': ['metadata.subjects.*']},
  "Technique.pid": {"key": "metadata.subjects.id"},
  "Technique.name": {"key": "metadata.subjects.subject"},

  "Parameter" : {"key": "metadata.subjects.subject:Parameter*", 'multiple': true, 'fields': ['metadata.subjects.*', 'id']},
  "Parameter.name": {"key": "metadata.subjects.subject", "resultFormatter": (value, propertyKey, data) => value.split(' ')[1]},
  "Parameter.value": {"key": "metadata.subjects.subject", "resultFormatter": (value, propertyKey, data) => value.split(' ')[2]},
  "Parameter.unit": {"key": "metadata.subjects.subject", "resultFormatter": (value, propertyKey, data) => value.split(' ')[3]},
  "Parameter.datasetId": {"key": "id"},

  "File" : {"key": "metadata.resource_type.id:dataset*", 'multiple': true, 'fields': ['id', 'files.enabled', 'name.*', 'path.*', 'size.*', 'datasetId.*'], 'preprocessData': getFileData},
  "File.id": {"key": "id"},
  "File.name": {"key": "name"},
  "File.path": {"key": "path"},
  "File.size": {"key": "size"},
  "File.datasetId": {"key": "id"},
}
