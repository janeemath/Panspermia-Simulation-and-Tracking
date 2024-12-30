import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Space Data Integration Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('submit-space-data', () => {
    it('should submit space data successfully', async () => {
      const missionId = 'MARS2023';
      const data = 'Atmospheric composition: 95% CO2, 3% N2, 2% Ar';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('space-data-integration', 'submit-space-data', [missionId, data]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('space-data-integration', 'submit-space-data', [missionId, data]);
    });
  });
  
  describe('get-space-data', () => {
    it('should return space data for a specific mission', async () => {
      const missionId = 'MARS2023';
      const expectedData = {
        data: 'Atmospheric composition: 95% CO2, 3% N2, 2% Ar',
        timestamp: 123456,
        submitter: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedData });
      
      const result = await mockContractCall('space-data-integration', 'get-space-data', [missionId]);
      
      expect(result.value).toEqual(expectedData);
      expect(mockContractCall).toHaveBeenCalledWith('space-data-integration', 'get-space-data', [missionId]);
    });
    
    it('should return null for non-existent mission data', async () => {
      const missionId = 'NONEXISTENT';
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('space-data-integration', 'get-space-data', [missionId]);
      
      expect(result.value).toBeNull();
    });
  });
});

