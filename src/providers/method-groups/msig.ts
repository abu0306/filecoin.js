import { Connector } from '../../connectors/Connector';
import { ChainEpoch, Cid, TipSetKey } from '../Types';

/**
 * The Msig methods are used to interact with multisig wallets on the filecoin network
 */
export class JsonRpcMsigMethodGroup {
  private conn: Connector;

  constructor(conn: Connector) {
    this.conn = conn;
  }

  /**
   * returns the portion of a multisig's balance that can be withdrawn or spent
   * @param address
   * @param tipSetKey
   */
  public async getAvailableBalance(address: string, tipSetKey: TipSetKey): Promise<string> {
    const ret = await this.conn.request({ method: 'Filecoin.MsigGetAvailableBalance', params: [address, tipSetKey] });
    return ret;
  }

  /**
   * returns the amount of FIL that vested in a multisig in a certain period.
   * @param address
   * @param startEpoch
   * @param endEpoch
   */
  public async getVested(address: string, startEpoch: TipSetKey, endEpoch: TipSetKey): Promise<string> {
    const ret = await this.conn.request({ method: 'Filecoin.MsigGetVested', params: [address, startEpoch, endEpoch] });
    return ret;
  }

  /**
   * creates a multisig wallet
   * @param requiredNumberOfSenders
   * @param approvingAddresses
   * @param unlockDuration
   * @param initialBalance
   * @param senderAddressOfCreateMsg
   * @param gasPrice
   */
  public async create(
    requiredNumberOfSenders: number,
    approvingAddresses: string[],
    unlockDuration: ChainEpoch,
    initialBalance: string,
    senderAddressOfCreateMsg: string,
    gasPrice: string
  ): Promise<Cid> {
    const ret = await this.conn.request(
      {
        method: 'Filecoin.MsigCreate',
        params: [
          requiredNumberOfSenders,
          approvingAddresses,
          unlockDuration,
          initialBalance,
          senderAddressOfCreateMsg,
          gasPrice
        ]
      });
    return ret;
  }

  /**
   * proposes a multisig message
   * @param address
   * @param recipientAddres
   * @param value
   * @param senderAddressOfProposeMsg
   * @param methodToCallInProposeMsg
   * @param paramsToIncludeInProposeMsg
   */
  public async propose(
    address: string,
    recipientAddres: string,
    value: string,
    senderAddressOfProposeMsg: string,
    methodToCallInProposeMsg: number,
    paramsToIncludeInProposeMsg: []
  ): Promise<Cid> {
    const ret = await this.conn.request(
      {
        method: 'Filecoin.MsigPropose',
        params: [
          address,
          recipientAddres,
          value,
          senderAddressOfProposeMsg,
          methodToCallInProposeMsg,
          paramsToIncludeInProposeMsg
        ]
      });
    return ret;
  }

  /**
   * approves a previously-proposed multisig message
   * @param address
   * @param proposedMessageId
   * @param proposerAddress
   * @param recipientAddres
   * @param value
   * @param senderAddressOfApproveMsg
   * @param methodToCallInProposeMsg
   * @param paramsToIncludeInProposeMsg
   */
  public async approve(
    address: string,
    proposedMessageId: number,
    proposerAddress: string,
    recipientAddres: string,
    value: string,
    senderAddressOfApproveMsg: string,
    methodToCallInProposeMsg: number,
    paramsToIncludeInProposeMsg: []
  ): Promise<Cid> {
    const ret = await this.conn.request(
      {
        method: 'Filecoin.MsigApprove',
        params: [
          address,
          proposedMessageId,
          proposerAddress,
          recipientAddres,
          value,
          senderAddressOfApproveMsg,
          methodToCallInProposeMsg,
          paramsToIncludeInProposeMsg
        ]
      });
    return ret;
  }

  /**
   * cancels a previously-proposed multisig message
   * @param address
   * @param proposedMessageId
   * @param proposerAddress
   * @param recipientAddres
   * @param value
   * @param senderAddressOfCancelMsg
   * @param methodToCallInProposeMsg
   * @param paramsToIncludeInProposeMsg
   */
  public async cancel(
    address: string,
    proposedMessageId: number,
    proposerAddress: string,
    recipientAddres: string,
    value: string,
    senderAddressOfCancelMsg: string,
    methodToCallInProposeMsg: number,
    paramsToIncludeInProposeMsg: []
  ): Promise<Cid> {
    const ret = await this.conn.request(
      {
        method: 'Filecoin.MsigCancel',
        params: [
          address,
          proposedMessageId,
          proposerAddress,
          recipientAddres,
          value,
          senderAddressOfCancelMsg,
          methodToCallInProposeMsg,
          paramsToIncludeInProposeMsg
        ]
      });
    return ret;
  }

  /**
   * proposes adding a signer in the multisig
   * @param address
   * @param senderAddressOfProposeMsg
   * @param newSignerAddress
   * @param increaseNumberOfRequiredSigners
   */
  public async addPropose(
    address: string,
    senderAddressOfProposeMsg: string,
    newSignerAddress: string,
    increaseNumberOfRequiredSigners: boolean,
  ): Promise<Cid> {
    const ret = await this.conn.request(
      {
        method: 'Filecoin.MsigAddPropose',
        params: [
          address,
          senderAddressOfProposeMsg,
          newSignerAddress,
          increaseNumberOfRequiredSigners
        ]
      });
    return ret;
  }

  /**
   * approves a previously proposed AddSigner message
   * @param address
   * @param senderAddressOfApproveMsg
   * @param proposedMessageId
   * @param proposerAddress
   * @param newSignerAddress
   * @param increaseNumberOfRequiredSigners
   */
  public async addApprove(
    address: string,
    senderAddressOfApproveMsg: string,
    proposedMessageId: number,
    proposerAddress: string,
    newSignerAddress: string,
    increaseNumberOfRequiredSigners: boolean
  ): Promise<Cid> {
    const ret = await this.conn.request(
      {
        method: 'Filecoin.MsigAddApprove',
        params: [
          address,
          senderAddressOfApproveMsg,
          proposedMessageId,
          proposerAddress,
          newSignerAddress,
          increaseNumberOfRequiredSigners
        ]
      });
    return ret;
  }

  /**
   * cancels a previously proposed AddSigner message
   * @param address
   * @param senderAddressOfCancelMsg
   * @param proposedMessageId
   * @param newSignerAddress
   * @param increaseNumberOfRequiredSigners
   */
  public async addCancel(
    address: string,
    senderAddressOfCancelMsg: string,
    proposedMessageId: number,
    newSignerAddress: string,
    increaseNumberOfRequiredSigners: boolean
  ): Promise<Cid> {
    const ret = await this.conn.request(
      {
        method: 'Filecoin.MsigAddCancel',
        params: [
          address,
          senderAddressOfCancelMsg,
          proposedMessageId,
          newSignerAddress,
          increaseNumberOfRequiredSigners
        ]
      });
    return ret;
  }

  /**
   * proposes swapping 2 signers in the multisig
   * @param address
   * @param senderAddressOfProposeMsg
   * @param oldSignerAddress
   * @param newSignerAddress
   */
  public async swapPropose(
    address: string,
    senderAddressOfProposeMsg: string,
    oldSignerAddress: string,
    newSignerAddress: string,
  ): Promise<Cid> {
    const ret = await this.conn.request(
      {
        method: 'Filecoin.MsigSwapPropose',
        params: [
          address,
          senderAddressOfProposeMsg,
          oldSignerAddress,
          newSignerAddress
        ]
      });
    return ret;
  }

  /**
   * approves a previously proposed SwapSigner
   * @param address
   * @param senderAddressOfApproveMsg
   * @param proposedMessageId
   * @param proposerAddress
   * @param oldSignerAddress
   * @param newSignerAddress
   */
  public async swapApprove(
    address: string,
    senderAddressOfApproveMsg: string,
    proposedMessageId: number,
    proposerAddress: string,
    oldSignerAddress: string,
    newSignerAddress: string,
  ): Promise<Cid> {
    const ret = await this.conn.request(
      {
        method: 'Filecoin.MsigSwapApprove',
        params: [
          address,
          senderAddressOfApproveMsg,
          proposedMessageId,
          proposerAddress,
          oldSignerAddress,
          newSignerAddress,
        ]
      });
    return ret;
  }

  /**
   * cancels a previously proposed SwapSigner message
   * @param address
   * @param senderAddressOfCancelMsg
   * @param proposedMessageId
   * @param oldSignerAddress
   * @param newSignerAddress
   */
  public async multiSigSwapCancel(
    address: string,
    senderAddressOfCancelMsg: string,
    proposedMessageId: number,
    oldSignerAddress: string,
    newSignerAddress: string,
  ): Promise<Cid> {
    const ret = await this.conn.request(
      {
        method: 'Filecoin.MsigSwapCancel',
        params: [
          address,
          senderAddressOfCancelMsg,
          proposedMessageId,
          oldSignerAddress,
          newSignerAddress,
        ]
      });
    return ret;
  }

}
