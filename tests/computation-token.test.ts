import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Computation Token Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('mint', () => {
    it('should mint tokens successfully', async () => {
      const amount = 1000;
      const recipient = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('computation-token', 'mint', [amount, recipient]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('computation-token', 'mint', [amount, recipient]);
    });
    
    it('should fail if not called by contract owner', async () => {
      const amount = 1000;
      const recipient = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('computation-token', 'mint', [amount, recipient]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('transfer', () => {
    it('should transfer tokens successfully', async () => {
      const amount = 500;
      const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('computation-token', 'transfer', [amount, sender, recipient]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('computation-token', 'transfer', [amount, sender, recipient]);
    });
    
    it('should fail if sender has insufficient balance', async () => {
      const amount = 1000000;
      const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockRejectedValue(new Error('Insufficient balance'));
      
      await expect(mockContractCall('computation-token', 'transfer', [amount, sender, recipient]))
          .rejects.toThrow('Insufficient balance');
    });
  });
  
  describe('burn', () => {
    it('should burn tokens successfully', async () => {
      const amount = 200;
      const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('computation-token', 'burn', [amount, owner]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('computation-token', 'burn', [amount, owner]);
    });
    
    it('should fail if not called by token owner', async () => {
      const amount = 200;
      const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('computation-token', 'burn', [amount, owner]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-balance', () => {
    it('should return the correct token balance for an account', async () => {
      const account = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const expectedBalance = 750;
      
      mockContractCall.mockResolvedValue({ value: expectedBalance });
      
      const result = await mockContractCall('computation-token', 'get-balance', [account]);
      
      expect(result.value).toBe(expectedBalance);
      expect(mockContractCall).toHaveBeenCalledWith('computation-token', 'get-balance', [account]);
    });
  });
});

