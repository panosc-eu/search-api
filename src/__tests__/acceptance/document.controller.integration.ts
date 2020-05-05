// import {DocumentController} from '../../controllers';
// import {PanService, ScicatServiceProvider} from '../../services';
// import {expect} from '@loopback/testlab';
// import {ScicatDataSource} from '../../datasources';
// import {
//   DocumentRepository,
//   DatasetRepository,
//   ParameterRepository,
//   SampleRepository,
//   TechniqueRepository,
//   FileRepository,
// } from '../../repositories';
// import {DbDataSource} from '../../datasources/db.datasource';
// import {MemberRepository} from '../../repositories/member.repository';
// import {AffiliationRepository} from '../../repositories/affiliation.repository';
// import {PersonRepository} from '../../repositories/person.repository';

// describe('DocumentController (integration)', () => {
//   beforeEach(givenMockScicatService);
//   let scicatMockService: PanService;

//   describe('get documents()', () => {
//     it('returns array of results', async () => {
//       const controller = new DocumentController(
//         new DocumentRepository(
//           new DbDataSource(),
//           async () =>
//             new MemberRepository(
//               new DbDataSource(),
//               async () => new AffiliationRepository(new DbDataSource()),
//               async () => new PersonRepository(new DbDataSource()),
//             ),
//           async () =>
//             new DatasetRepository(
//               new DbDataSource(),
//               async () => new ParameterRepository(new DbDataSource()),
//               async () => new SampleRepository(new DbDataSource()),
//               async () => new TechniqueRepository(new DbDataSource()),
//               async () => new FileRepository(new DbDataSource()),
//             ),
//         ),
//         scicatMockService,
//       );
//       const details = await controller.find({
//         skip: 0,
//         limit: 2,
//       });
//       console.log(details);
//       expect(details).to.be.an.Array();
//       expect(details[0]).to.have.property('license');
//       expect(details[0]).to.have.property('title');
//     });

//     it('queries for related datasets', async () => {
//       const controller = new DocumentController(
//         new DocumentRepository(
//           new DbDataSource(),
//           async () =>
//             new MemberRepository(
//               new DbDataSource(),
//               async () => new AffiliationRepository(new DbDataSource()),
//               async () => new PersonRepository(new DbDataSource()),
//             ),
//           async () =>
//             new DatasetRepository(
//               new DbDataSource(),
//               async () => new ParameterRepository(new DbDataSource()),
//               async () => new SampleRepository(new DbDataSource()),
//               async () => new TechniqueRepository(new DbDataSource()),
//               async () => new FileRepository(new DbDataSource()),
//             ),
//         ),
//         scicatMockService,
//       );
//       const details1 = await controller.find({
//         skip: 0,
//         limit: 1,
//         include: [
//           {
//             relation: 'datasets',
//             scope: {
//               where: {pid: '20.500.12269/df01c062-2629-4d60-913f-8f62743d37bf'},
//             },
//           },
//         ],
//       });
//       console.log('document with datasets', details1);
//       expect(details1).to.be.an.Array();
//     });
//   });

//   async function givenMockScicatService() {
//     const scicatMockDataSource = await givenAConnectedDataSource();
//     scicatMockService = await new ScicatServiceProvider(
//       scicatMockDataSource,
//     ).value();
//   }

//   async function givenAConnectedDataSource(): Promise<ScicatDataSource> {
//     const scicatDataSource = new ScicatDataSource();
//     await scicatDataSource.connect();
//     return scicatDataSource;
//   }
// });
