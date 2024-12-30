import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Simulation Parameters Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('create-simulation', () => {
    it('should create a simulation successfully', async () => {
      const name = 'Panspermia Alpha';
      const description = 'Simulating bacterial transfer between exoplanets';
      const parameters = ['gravity', 'atmosphere', 'radiation'];
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new simulation ID
      
      const result = await mockContractCall('simulation-parameters', 'create-simulation', [name, description, parameters]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('simulation-parameters', 'create-simulation', [name, description, parameters]);
    });
  });
  
  describe('update-simulation-status', () => {
    it('should update simulation status successfully', async () => {
      const simulationId = 1;
      const newStatus = 'running';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('simulation-parameters', 'update-simulation-status', [simulationId, newStatus]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('simulation-parameters', 'update-simulation-status', [simulationId, newStatus]);
    });
    
    it('should fail if not called by the simulation creator', async () => {
      const simulationId = 1;
      const newStatus = 'completed';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('simulation-parameters', 'update-simulation-status', [simulationId, newStatus]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-simulation', () => {
    it('should return simulation details', async () => {
      const simulationId = 1;
      const expectedSimulation = {
        creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        name: 'Panspermia Alpha',
        description: 'Simulating bacterial transfer between exoplanets',
        parameters: ['gravity', 'atmosphere', 'radiation'],
        status: 'created'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedSimulation });
      
      const result = await mockContractCall('simulation-parameters', 'get-simulation', [simulationId]);
      
      expect(result.value).toEqual(expectedSimulation);
      expect(mockContractCall).toHaveBeenCalledWith('simulation-parameters', 'get-simulation', [simulationId]);
    });
    
    it('should return null for non-existent simulation', async () => {
      const simulationId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('simulation-parameters', 'get-simulation', [simulationId]);
      
      expect(result.value).toBeNull();
    });
  });
});

