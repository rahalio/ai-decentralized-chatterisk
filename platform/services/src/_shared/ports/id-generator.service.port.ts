/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@chatterisk/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  prjId(): string;
  cmtId(): string;
  aggId(): string;
  altId(): string;
  plcId(): string;
  dosId(): string;
  lnkId(): string;
  botId(): string;
  mdlId(): string;
  rtnId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
