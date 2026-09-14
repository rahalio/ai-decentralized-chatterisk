/**
 * ID Generator Service Implementation — starter prefixes.
 */

import type { DomainCode } from '@chatterisk/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@chatterisk/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@chatterisk/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  prjId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.project);
  }
  cmtId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.comment);
  }
  aggId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.aggregate);
  }
  altId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.alert);
  }
  plcId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.policy);
  }
  dosId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.dossier);
  }
  lnkId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.link);
  }
  botId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.bot);
  }
  mdlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.model);
  }
  rtnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.retention);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
