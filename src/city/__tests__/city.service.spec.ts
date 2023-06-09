import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../../cache/cache.service';
import { cityMock } from '../__mocks__/city.mock';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return city in findCityById', async () => {
    expect(await service.findCityById(cityMock.id)).toEqual(cityMock);
  });

  it('should return error in findCityById', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findCityById(cityMock.id)).rejects.toThrowError();
  });

  it('should return array of cities in getAllCitiesByState', async () => {
    expect(await service.getAllCitiesByState(cityMock.id)).toEqual([cityMock]);
  });
});
