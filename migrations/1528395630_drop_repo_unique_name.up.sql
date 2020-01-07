BEGIN;

ALTER TABLE repo
  DROP CONSTRAINT deleted_at_unused;

COMMIT;
