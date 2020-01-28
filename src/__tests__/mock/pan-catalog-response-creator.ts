export default class PanCatalogResponseCreator {
  getDataset(pid: string) {
    return {
      pid: pid,
      name: 'Small-angle scattering of pressurised water',
      size: 3,
      isPublic: true,
      creationDate: '2019-09-27T06:04:21.429Z',
    };
  }

  getDatasets() {
    const arr = [
      {
        pid: '10.10572/xx',
        name: 'Small-angle scattering of pressurised water',
        size: 3,
        isPublic: true,
        creationDate: '2019-09-27T06:04:21.429Z',
      },
      {
        pid: '10.10571/yy',
        name: 'Small-angle scattering of pressurised water',
        size: 3,
        isPublic: true,
        creationDate: '2019-09-27T06:04:21.429Z',
      },
    ];
    return arr;
  }
}
