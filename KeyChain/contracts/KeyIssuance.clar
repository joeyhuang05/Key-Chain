;;(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)
;;
;;(define-non-fungible-token key uint)
;;
;;(define-data-var last-token-id uint u0)
;;(define-map token-metadata uint (tuple (business principal) (check-in-time uint)))
;;
;;(define-read-only (get-check-in-time (token-id uint))
;;    (ok (get check-in-time (map-get? token-metadata token-id)))
;;)
;;
;;(define-read-only (get-business (token-id uint))
;;    (ok (get business (map-get? token-metadata token-id)))
;;)
;;
;;(define-public (mint (recipient principal))
;;	(let
;;		(
;;			(token-id (+ (var-get last-token-id) u1))
;;		)
;;		(asserts! (is-eq tx-sender contract-owner) err-owner-only)
;;		(try! (nft-mint? key token-id recipient))
;;        (var-set last-token-id token-id)
;;        (map-insert token-metadata token-id (tuple (business contract-owner) (check-in-time stacks-block-height)))
;;		(ok token-id)
;;	)
;;)