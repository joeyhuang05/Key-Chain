(define-map businesses { business: principal })
(define-non-fungible-token keys { user: principal, business: principal, timestamp: uint })

(define-public (issue-key (user principal))
    (let (
        (current-time (block-info time))
    )
        (begin
            (nft-mint keys { user: user, business: tx-sender, timestamp: current-time } tx-sender)
            (ok "Key issued successfully!")
        )
    ))

(define-read-only (get-key-details (key-id uint))
    (nft-get-owner keys key-id))