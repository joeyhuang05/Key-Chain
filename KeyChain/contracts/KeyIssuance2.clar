(define-non-fungible-token keys uint)

(define-data-var nfts-minted uint u0)
(define-data-var live-keys  (list 50 uint) (list ))
(define-map key-data uint (tuple (business principal) (time uint)))

(define-public (issue-key (user principal))
    (let (
        (current-time (default-to u0 (get-stacks-block-info? time stacks-block-height)))
        (token-id (var-get nfts-minted))
    )
        (begin
            (filter is-dead (var-get live-keys))
            (try! (nft-mint? keys token-id user))
            (map-insert key-data token-id (tuple (business tx-sender) (time current-time)))
            (append (var-get live-keys) token-id)
            (var-set nfts-minted (+ token-id u1))
            (ok token-id)
        )
    )
)

(define-private (is-dead (token-id uint))
    (let
        (
            (data (map-get? key-data token-id))
            (key-time (default-to u0 (get time data)))
            (cutoff-time (- (default-to u0 (get-stacks-block-info? time stacks-block-height)) u43200))
            (nft-owner (unwrap! (nft-get-owner? keys token-id) false))
        )
        (if (< key-time cutoff-time)
            (begin
                (is-ok (nft-burn? keys token-id nft-owner))
            )
            false
        )
    )
)

(define-read-only (get-key-details (key-id uint))
    (ok (map-get? key-data key-id))
)