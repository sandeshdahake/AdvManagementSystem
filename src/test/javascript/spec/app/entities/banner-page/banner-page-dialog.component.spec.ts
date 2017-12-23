/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerPageDialogComponent } from '../../../../../../main/webapp/app/entities/banner-page/banner-page-dialog.component';
import { BannerPageService } from '../../../../../../main/webapp/app/entities/banner-page/banner-page.service';
import { BannerPage } from '../../../../../../main/webapp/app/entities/banner-page/banner-page.model';

describe('Component Tests', () => {

    describe('BannerPage Management Dialog Component', () => {
        let comp: BannerPageDialogComponent;
        let fixture: ComponentFixture<BannerPageDialogComponent>;
        let service: BannerPageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerPageDialogComponent],
                providers: [
                    BannerPageService
                ]
            })
            .overrideTemplate(BannerPageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerPageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerPageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerPage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bannerPage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerPageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerPage();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bannerPage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerPageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
