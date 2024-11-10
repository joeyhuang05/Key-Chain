(define-non-fungible-token keys uint)

(define-data-var nfts-minted uint u0)
(define-data-var live-keys  (list 50 uint) (list ))
(define-map key-data uint (tuple (business principal) (time uint)))
(define-map user-map principal (list 50 uint))
(define-map user-map principal (list 50 principal))

(define-data-var check-id uint u0)
(define-data-var check-business principal 'SP000000000000000000002Q6VF78)

(define-public (issue-key (user principal))
    (let (
        (current-time (default-to u0 (get-stacks-block-info? time stacks-block-height)))
        (token-id (var-get nfts-minted))
        (user-nfts (map-get? user-map user))
    )
        (begin
            (var-set live-keys (filter is-dead (var-get live-keys)))
            (try! (nft-mint? keys token-id user))
            (map-insert key-data token-id (tuple (business tx-sender) (time current-time)))
            (match
                user-nfts
                value (map-insert user-map user (unwrap! (as-max-len?  (append value token-id) u50) (err u1)))
                (map-insert user-map user (list token-id))
                value (map-insert user-map user (unwrap! (as-max-len?  (append value tx-sender) u50) (err u1)))
                (map-insert user-map user (list tx-sender))
            )
            (var-set live-keys (unwrap! (as-max-len?  (append (var-get live-keys) token-id) u50) (err u1)))
            (var-set nfts-minted (+ token-id u1))
            (ok token-id)
        )
    )
)

(define-private (is-dead (token-id uint))
    (let
        (
            (data (map-get? key-data token-id))
            (key-time (+ (default-to u0 (get time data)) u43200))
            (cutoff-time (default-to u0 (get-stacks-block-info? time stacks-block-height)))
            (user (unwrap! (nft-get-owner? keys token-id) false))
            (user-nfts (unwrap! (map-get? user-map user) false))
        )
        (if (< key-time cutoff-time)
            (begin
                (var-set check-id token-id)
                (var-set check-business (default-to 'SP000000000000000000002Q6VF78 (get business data)))
                (map-insert user-map user (filter is-in user-nfts))
                (is-err (nft-burn? keys token-id user))
            )
            true
        )
    )
)

(define-private (is-in (token-id uint)) 
    (not (is-eq token-id (var-get check-id)))
(define-private (is-in (business principal)) 
    (not (is-eq business (var-get check-business)))
)

(define-read-only (get-key-details (key-id uint))
    (ok (map-get? key-data key-id))
)

(define-read-only (get-user-map (user principal))
    (map-get? user-map user)
)